const express = require("express");
const fs = require("node:fs");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "matrix.json");

const DEFAULT_DATA = {
  suppliers: [
    {
      id: "sup-1",
      name: "Nordic Supply AB",
      email: "support@nordicsupply.se",
      notes: "Returer via portal.",
    },
    {
      id: "sup-2",
      name: "ProTech Distribution",
      email: "rma@protech.eu",
      notes: "B2B prioriterad kö.",
    },
  ],
  brands: [
    { id: "bra-1", name: "AeroHome", supplierId: "sup-1" },
    { id: "bra-2", name: "FieldCore", supplierId: "sup-2" },
  ],
  categories: [
    { id: "cat-1", name: "Robotdammsugare" },
    { id: "cat-2", name: "Bärbar dator" },
    { id: "cat-3", name: "Skärm" },
  ],
  rules: [
    {
      id: "rule-1",
      caseType: "doa",
      customerType: "private",
      brandId: "bra-1",
      categoryId: "cat-1",
      headline: "Direkt DOA-byte via intern retur",
      instructions: [
        "Verifiera fel med kort felsökning (max 10 min).",
        "Skapa returfraktsedel och boka upphämtning.",
        "Skicka ersättningsenhet från eget lager inom 24h.",
      ],
      responsible: "1st line + Lager",
      sla: "Svar 4h / utbyte 24h",
    },
    {
      id: "rule-2",
      caseType: "warranty",
      customerType: "b2b",
      brandId: "bra-2",
      categoryId: "cat-2",
      headline: "RMA via leverantör med prioriterad B2B",
      instructions: [
        "Samla serienummer, inköpsdatum och felkod.",
        "Skicka RMA-ärende till leverantörens B2B-kanal.",
        "Informera kund om förväntad ledtid och låneenhet vid behov.",
      ],
      responsible: "Tekniker + Leverantör",
      sla: "Svar 8h / diagnos 72h",
    },
    {
      id: "rule-3",
      caseType: "all",
      customerType: "all",
      brandId: "all",
      categoryId: "all",
      headline: "Standardflöde när specifik regel saknas",
      instructions: [
        "Logga grunddata: kund, artikelnummer, serienummer, felbeskrivning.",
        "Kontrollera garantistatus och inköpsbevis.",
        "Eskaleringsbeslut tas av support lead vid oklarhet.",
      ],
      responsible: "Support lead",
      sla: "Svar 24h",
    },
  ],
};

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeData(raw) {
  const input = raw || {};
  return {
    suppliers: Array.isArray(input.suppliers)
      ? input.suppliers
          .filter((s) => s && s.id && s.name)
          .map((s) => ({
            id: String(s.id),
            name: String(s.name),
            email: String(s.email || ""),
            notes: String(s.notes || ""),
          }))
      : [],
    brands: Array.isArray(input.brands)
      ? input.brands
          .filter((b) => b && b.id && b.name)
          .map((b) => ({
            id: String(b.id),
            name: String(b.name),
            supplierId: String(b.supplierId || ""),
          }))
      : [],
    categories: Array.isArray(input.categories)
      ? input.categories
          .filter((c) => c && c.id && c.name)
          .map((c) => ({
            id: String(c.id),
            name: String(c.name),
          }))
      : [],
    rules: Array.isArray(input.rules)
      ? input.rules
          .filter((r) => r && r.id && r.headline)
          .map((r) => ({
            id: String(r.id),
            caseType: String(r.caseType || "all"),
            customerType: String(r.customerType || "all"),
            brandId: String(r.brandId || "all"),
            categoryId: String(r.categoryId || "all"),
            headline: String(r.headline),
            instructions: Array.isArray(r.instructions)
              ? r.instructions.map((x) => String(x)).filter(Boolean)
              : String(r.instructions || "")
                  .split("\n")
                  .map((x) => x.trim())
                  .filter(Boolean),
            responsible: String(r.responsible || ""),
            sla: String(r.sla || ""),
          }))
      : [],
  };
}

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2));
  }
}

function readData() {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    const normalized = normalizeData(parsed);
    if (
      !normalized.suppliers.length ||
      !normalized.brands.length ||
      !normalized.categories.length ||
      !normalized.rules.length
    ) {
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
    return normalized;
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function writeData(data) {
  ensureDataFile();
  const normalized = normalizeData(data);
  fs.writeFileSync(DATA_FILE, JSON.stringify(normalized, null, 2));
  return normalized;
}

function findByName(arr, name) {
  return arr.find((entry) => entry.name.toLowerCase() === name.toLowerCase());
}

function toSafeCaseType(value) {
  return ["doa", "warranty", "all"].includes(value) ? value : "all";
}

function toSafeCustomerType(value) {
  return ["private", "b2b", "all"].includes(value) ? value : "all";
}

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/api/matrix", (_req, res) => {
  res.json(readData());
});

app.put("/api/matrix", (req, res) => {
  const normalized = normalizeData(req.body);
  if (
    !normalized.suppliers.length ||
    !normalized.brands.length ||
    !normalized.categories.length ||
    !normalized.rules.length
  ) {
    res.status(400).json({ error: "Invalid matrix payload." });
    return;
  }

  const saved = writeData(normalized);
  res.json(saved);
});

app.post("/api/intake", (req, res) => {
  const payload = req.body || {};

  const supplierName = String(payload.supplierName || "").trim();
  const supplierEmail = String(payload.supplierEmail || "").trim();
  const supplierNotes = String(payload.supplierNotes || "").trim();
  const brandName = String(payload.brandName || "").trim();
  const categoryName = String(payload.categoryName || "").trim();
  const caseType = toSafeCaseType(String(payload.caseType || "all").trim());
  const customerType = toSafeCustomerType(String(payload.customerType || "all").trim());
  const headline = String(payload.headline || "").trim();
  const responsible = String(payload.responsible || "").trim();
  const sla = String(payload.sla || "").trim();
  const instructions = String(payload.instructions || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (!supplierName || !brandName || !categoryName || !headline || !instructions.length) {
    res.status(400).json({
      error:
        "Missing required fields. supplierName, brandName, categoryName, headline and instructions are required.",
    });
    return;
  }

  const db = readData();

  let supplier = findByName(db.suppliers, supplierName);
  if (!supplier) {
    supplier = {
      id: uid("sup"),
      name: supplierName,
      email: supplierEmail,
      notes: supplierNotes,
    };
    db.suppliers.push(supplier);
  } else {
    if (supplierEmail) supplier.email = supplierEmail;
    if (supplierNotes) supplier.notes = supplierNotes;
  }

  let brand = findByName(db.brands, brandName);
  if (!brand) {
    brand = {
      id: uid("bra"),
      name: brandName,
      supplierId: supplier.id,
    };
    db.brands.push(brand);
  } else {
    brand.supplierId = supplier.id;
  }

  let category = findByName(db.categories, categoryName);
  if (!category) {
    category = {
      id: uid("cat"),
      name: categoryName,
    };
    db.categories.push(category);
  }

  db.rules.push({
    id: uid("rule"),
    caseType,
    customerType,
    brandId: brand.id,
    categoryId: category.id,
    headline,
    instructions,
    responsible,
    sla,
  });

  writeData(db);

  res.status(201).json({
    message: "Intake accepted and synced to support matrix.",
    supplier,
    brand,
    category,
  });
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/intake", (_req, res) => {
  res.sendFile(path.join(__dirname, "intake.html"));
});

app.listen(PORT, () => {
  console.log(`Support matrix running on port ${PORT}`);
});
