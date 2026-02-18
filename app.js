const STORAGE_KEY = "support-matrix-v1";

const CASE_TYPES = [
  { id: "all", label: "Alla ärendetyper" },
  { id: "doa", label: "DOA (dead on arrival)" },
  { id: "warranty", label: "Garanti efter användning" },
];

const CUSTOMER_TYPES = [
  { id: "all", label: "Alla kundtyper" },
  { id: "private", label: "Privat" },
  { id: "b2b", label: "Business to business" },
];

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

const byId = (arr, id) => arr.find((item) => item.id === id);
const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

function normalizeData(raw) {
  const candidate = {
    suppliers: Array.isArray(raw?.suppliers) ? raw.suppliers : [],
    brands: Array.isArray(raw?.brands) ? raw.brands : [],
    categories: Array.isArray(raw?.categories) ? raw.categories : [],
    rules: Array.isArray(raw?.rules) ? raw.rules : [],
  };

  return {
    suppliers: candidate.suppliers
      .filter((s) => s && s.id && s.name)
      .map((s) => ({
        id: String(s.id),
        name: String(s.name),
        email: String(s.email || ""),
        notes: String(s.notes || ""),
      })),
    brands: candidate.brands
      .filter((b) => b && b.id && b.name)
      .map((b) => ({
        id: String(b.id),
        name: String(b.name),
        supplierId: String(b.supplierId || ""),
      })),
    categories: candidate.categories
      .filter((c) => c && c.id && c.name)
      .map((c) => ({ id: String(c.id), name: String(c.name) })),
    rules: candidate.rules
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
      })),
  };
}

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(DEFAULT_DATA);

  try {
    const parsed = JSON.parse(raw);
    const normalized = normalizeData(parsed);
    if (
      !normalized.suppliers.length ||
      !normalized.brands.length ||
      !normalized.categories.length ||
      !normalized.rules.length
    ) {
      return structuredClone(DEFAULT_DATA);
    }
    return normalized;
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

let db = loadData();

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function optionHtml(value, label) {
  return `<option value="${value}">${label}</option>`;
}

function labelForCaseType(id) {
  return CASE_TYPES.find((x) => x.id === id)?.label || id;
}

function labelForCustomerType(id) {
  return CUSTOMER_TYPES.find((x) => x.id === id)?.label || id;
}

function labelForBrand(id) {
  if (id === "all") return "Alla varumärken";
  return byId(db.brands, id)?.name || "Okänt varumärke";
}

function labelForCategory(id) {
  if (id === "all") return "Alla produktgrupper";
  return byId(db.categories, id)?.name || "Okänd produktgrupp";
}

function readFlowInput() {
  return {
    caseType: document.getElementById("caseType").value,
    customerType: document.getElementById("customerType").value,
    brandId: document.getElementById("brand").value,
    categoryId: document.getElementById("category").value,
  };
}

function fillFlowSelectors(preserve = null) {
  const caseType = document.getElementById("caseType");
  const customerType = document.getElementById("customerType");
  const brand = document.getElementById("brand");
  const category = document.getElementById("category");

  caseType.innerHTML = CASE_TYPES.map((x) => optionHtml(x.id, x.label)).join("");
  customerType.innerHTML = CUSTOMER_TYPES.map((x) => optionHtml(x.id, x.label)).join("");
  brand.innerHTML = [optionHtml("all", "Alla varumärken")]
    .concat(db.brands.map((b) => optionHtml(b.id, b.name)))
    .join("");
  category.innerHTML = [optionHtml("all", "Alla produktgrupper")]
    .concat(db.categories.map((c) => optionHtml(c.id, c.name)))
    .join("");

  caseType.value = preserve?.caseType || "doa";
  customerType.value = preserve?.customerType || "private";
  brand.value = preserve?.brandId || "all";
  category.value = preserve?.categoryId || "all";
}

function fillAdminSelectors() {
  const supplierSel = document.getElementById("brandSupplier");
  const ruleCase = document.getElementById("ruleCaseType");
  const ruleCustomer = document.getElementById("ruleCustomerType");
  const ruleBrand = document.getElementById("ruleBrand");
  const ruleCategory = document.getElementById("ruleCategory");

  if (db.suppliers.length) {
    supplierSel.innerHTML = db.suppliers.map((s) => optionHtml(s.id, s.name)).join("");
  } else {
    supplierSel.innerHTML = optionHtml("", "Lägg till leverantör först");
  }

  ruleCase.innerHTML = CASE_TYPES.map((x) => optionHtml(x.id, x.label)).join("");
  ruleCustomer.innerHTML = CUSTOMER_TYPES.map((x) => optionHtml(x.id, x.label)).join("");
  ruleBrand.innerHTML = [optionHtml("all", "Alla varumärken")]
    .concat(db.brands.map((b) => optionHtml(b.id, b.name)))
    .join("");
  ruleCategory.innerHTML = [optionHtml("all", "Alla produktgrupper")]
    .concat(db.categories.map((c) => optionHtml(c.id, c.name)))
    .join("");
}

function scoreRule(rule, input) {
  const keys = ["caseType", "customerType", "brandId", "categoryId"];
  let score = 0;

  for (const key of keys) {
    const wanted = input[key];
    const value = rule[key];

    if (value === wanted) {
      score += 3;
      continue;
    }

    if (value === "all") {
      score += 1;
      continue;
    }

    return -1;
  }

  return score;
}

function findBestRule(input) {
  let best = null;
  let bestScore = -1;

  for (const rule of db.rules) {
    const score = scoreRule(rule, input);
    if (score > bestScore) {
      best = rule;
      bestScore = score;
    }
  }

  return best;
}

function renderFlowChart(input, rule) {
  const flowChart = document.getElementById("flowChart");

  if (!rule) {
    flowChart.innerHTML = `<div class="flow-step"><span class="step-label">Status</span><span class="step-value">Ingen regel matchade vald kombination.</span></div>`;
    return;
  }

  const matchedBrand = labelForBrand(rule.brandId);
  const matchedCategory = labelForCategory(rule.categoryId);
  const supplierName = rule.brandId === "all" ? "Varierar" : byId(db.suppliers, byId(db.brands, rule.brandId)?.supplierId || "")?.name || "Okänd leverantör";

  const steps = [
    { label: "1. Ärendetyp", value: labelForCaseType(input.caseType) },
    { label: "2. Kundtyp", value: labelForCustomerType(input.customerType) },
    { label: "3. Varumärke", value: `${labelForBrand(input.brandId)}` },
    { label: "4. Produktgrupp", value: `${labelForCategory(input.categoryId)}` },
    { label: "5. Matchad regel", value: `${rule.headline}` },
    { label: "6. Routing", value: `${matchedBrand} -> ${supplierName} -> ${matchedCategory}` },
    {
      label: "7. Utför hantering",
      value: `${rule.responsible || "Ansvarig ej satt"} | ${rule.sla || "SLA ej satt"}`,
    },
  ];

  flowChart.innerHTML = steps
    .map(
      (step) =>
        `<div class="flow-step"><span class="step-label">${step.label}</span><span class="step-value">${step.value}</span></div>`,
    )
    .join("");
}

function renderResult() {
  const input = readFlowInput();
  const rule = findBestRule(input);
  const result = document.getElementById("result");

  if (!rule) {
    result.innerHTML = "<h3>Rekommenderad hantering</h3><p>Ingen matchande regel hittades.</p>";
    renderFlowChart(input, null);
    return;
  }

  const brandName = labelForBrand(rule.brandId);
  const categoryName = labelForCategory(rule.categoryId);

  result.innerHTML = `
    <h3>${rule.headline}</h3>
    <p><strong>Match:</strong> ${brandName} / ${categoryName}</p>
    <p><strong>Ansvarig:</strong> ${rule.responsible || "Ej satt"}</p>
    <p><strong>SLA:</strong> ${rule.sla || "Ej satt"}</p>
    <ol>${rule.instructions.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;

  renderFlowChart(input, rule);
}

function renderLists() {
  const supplierList = document.getElementById("supplierList");
  const brandList = document.getElementById("brandList");
  const categoryList = document.getElementById("categoryList");
  const ruleList = document.getElementById("ruleList");

  supplierList.innerHTML = db.suppliers
    .map((s) => `<li><strong>${s.name}</strong><br><small>${s.email || ""}</small></li>`)
    .join("");

  brandList.innerHTML = db.brands
    .map((b) => {
      const supplier = byId(db.suppliers, b.supplierId);
      return `<li><strong>${b.name}</strong><br><small>${supplier?.name || "Ingen leverantör"}</small></li>`;
    })
    .join("");

  categoryList.innerHTML = db.categories.map((c) => `<li>${c.name}</li>`).join("");

  ruleList.innerHTML = db.rules
    .map((r) => {
      return `<li><strong>${r.headline}</strong><br><small>${labelForCaseType(
        r.caseType,
      )} / ${labelForCustomerType(r.customerType)} / ${labelForBrand(r.brandId)} / ${labelForCategory(r.categoryId)}</small></li>`;
    })
    .join("");
}

function setImportStatus(message, isError = false) {
  const statusEl = document.getElementById("importStatus");
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#b42318" : "var(--ink-muted)";
}

function exportData() {
  const payload = JSON.stringify(db, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = url;
  a.download = `support-matrix-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
  setImportStatus("Export klar: JSON-filen laddades ner.");
}

async function importData(file) {
  if (!file) return;

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const normalized = normalizeData(parsed);

    if (
      !normalized.suppliers.length ||
      !normalized.brands.length ||
      !normalized.categories.length ||
      !normalized.rules.length
    ) {
      throw new Error("JSON saknar nödvändig data (suppliers/brands/categories/rules).");
    }

    db = normalized;
    saveData();
    boot(true);
    setImportStatus("Import klar: data uppdaterad från JSON-fil.");
  } catch (error) {
    setImportStatus(`Import misslyckades: ${error.message}`, true);
  }
}

function bindEvents() {
  ["caseType", "customerType", "brand", "category"].forEach((id) => {
    document.getElementById(id).addEventListener("change", renderResult);
  });

  document.getElementById("supplierForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    db.suppliers.push({
      id: uid("sup"),
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      notes: String(data.get("notes") || "").trim(),
    });
    saveData();
    e.currentTarget.reset();
    boot(true);
  });

  document.getElementById("brandForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const supplierId = String(data.get("supplierId") || "").trim();
    if (!supplierId) {
      setImportStatus("Lägg till leverantör innan du skapar varumärke.", true);
      return;
    }

    db.brands.push({
      id: uid("bra"),
      name: String(data.get("name") || "").trim(),
      supplierId,
    });
    saveData();
    e.currentTarget.reset();
    boot(true);
  });

  document.getElementById("categoryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    db.categories.push({
      id: uid("cat"),
      name: String(data.get("name") || "").trim(),
    });
    saveData();
    e.currentTarget.reset();
    boot(true);
  });

  document.getElementById("ruleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    db.rules.push({
      id: uid("rule"),
      caseType: String(data.get("caseType") || "all").trim(),
      customerType: String(data.get("customerType") || "all").trim(),
      brandId: String(data.get("brandId") || "all").trim(),
      categoryId: String(data.get("categoryId") || "all").trim(),
      headline: String(data.get("headline") || "").trim(),
      instructions: String(data.get("instructions") || "")
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
      responsible: String(data.get("responsible") || "").trim(),
      sla: String(data.get("sla") || "").trim(),
    });
    saveData();
    e.currentTarget.reset();
    boot(true);
  });

  document.getElementById("exportJson").addEventListener("click", exportData);

  document.getElementById("importJson").addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    await importData(file);
    e.target.value = "";
  });

  document.getElementById("resetData").addEventListener("click", () => {
    db = structuredClone(DEFAULT_DATA);
    saveData();
    boot(true);
    setImportStatus("Exempeldata återställd.");
  });
}

function boot(isRebind = false) {
  const selected = isRebind ? readFlowInput() : null;
  fillFlowSelectors(selected);
  fillAdminSelectors();
  renderLists();
  renderResult();

  if (!isRebind) bindEvents();
}

boot();
