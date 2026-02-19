const STORAGE_KEY = "support-matrix-v1";
const LANG_KEY = "support-matrix-lang";

const CASE_TYPES = ["all", "doa", "warranty"];
const CUSTOMER_TYPES = ["all", "private", "b2b"];

const I18N = {
  sv: {
    heroTitle: "Beslutsstöd för supportflöden",
    heroDesc:
      "Välj ärendetyp, kundtyp, varumärke och produktgrupp för att få rekommenderad hantering. Uppdatera allt via Admin-läget.",
    flowTitle: "Supportflöde",
    labelCaseType: "Ärendetyp",
    labelCustomerType: "Kundtyp",
    labelBrand: "Varumärke",
    labelCategory: "Produktgrupp",
    resultTitle: "Rekommenderad hantering",
    resultPrompt: "Gör dina val för att få instruktion.",
    flowVisualTitle: "Grafiskt flöde",
    adminTitle: "Admin",
    openIntakeForm: "Öppna varumärkesformulär",
    csvTemplateBtn: "CSV-mall",
    importCsvBtn: "Importera CSV",
    exportJsonBtn: "Exportera JSON",
    importJsonBtn: "Importera JSON",
    resetBtn: "Återställ exempeldata",
    supplierFormTitle: "Lägg till leverantör",
    brandFormTitle: "Lägg till varumärke",
    categoryFormTitle: "Lägg till produktgrupp",
    ruleFormTitle: "Lägg till hanteringsregel",
    saveSupplierBtn: "Spara leverantör",
    saveBrandBtn: "Spara varumärke",
    saveCategoryBtn: "Spara produktgrupp",
    saveRuleBtn: "Spara regel",
    suppliersListTitle: "Leverantörer",
    brandsListTitle: "Varumärken",
    categoriesListTitle: "Produktgrupper",
    rulesListTitle: "Regler",
    phName: "Namn",
    phEmail: "E-post",
    phNotes: "Notering",
    phBrand: "Varumärke",
    phCategory: "Produktgrupp",
    phHeadline: "Rubrik / kort sammanfattning",
    phInstructions: "Steg för hantering (en rad per steg)",
    phResponsible: "Ansvarig (ex: 1st line / Leverantör)",
    phSla: "SLA (ex: svar inom 24h)",
    allBrands: "Alla varumärken",
    allCategories: "Alla produktgrupper",
    addSupplierFirst: "Lägg till leverantör först",
    noSupplier: "Ingen leverantör",
    unknownBrand: "Okänt varumärke",
    unknownCategory: "Okänd produktgrupp",
    varying: "Varierar",
    unknownSupplier: "Okänd leverantör",
    notSet: "Ej satt",
    noRule: "Ingen matchande regel hittades.",
    match: "Match",
    responsible: "Ansvarig",
    sla: "SLA",
    flowNoRule: "Ingen regel matchade vald kombination.",
    flowStep1: "1. Ärendetyp",
    flowStep2: "2. Kundtyp",
    flowStep3: "3. Varumärke",
    flowStep4: "4. Produktgrupp",
    flowStep5: "5. Matchad regel",
    flowStep6: "6. Routing",
    flowStep7: "7. Utför hantering",
    noResponsible: "Ansvarig ej satt",
    noSla: "SLA ej satt",
    exportDone: "Export klar: JSON-filen laddades ner.",
    csvTemplateDone: "CSV-mall nedladdad.",
    importJsonDone: "Import klar: data uppdaterad från JSON-fil.",
    importJsonFail: "Import misslyckades: {error}",
    csvEmpty: "CSV-filen är tom.",
    csvFail: "CSV-import misslyckades: {error}",
    csvDone:
      "CSV importerad: {rules} regler, {suppliers} leverantörer, {brands} varumärken, {categories} kategorier. Skippade rader: {skipped}.",
    savedLocalServerFail: "Sparat lokalt men inte till servern: {error}",
    supplierSaved: "Leverantör sparad.",
    brandSaved: "Varumärke sparat.",
    categorySaved: "Produktgrupp sparad.",
    ruleSaved: "Regel sparad.",
    needSupplier: "Lägg till leverantör innan du skapar varumärke.",
    resetDone: "Exempeldata återställd.",
    syncedServer: "Synkad med serverdata.",
    syncFail: "Kunde inte synka serverdata: {error}",
    caseType: {
      all: "Alla ärendetyper",
      doa: "DOA (dead on arrival)",
      warranty: "Garanti efter användning",
    },
    customerType: {
      all: "Alla kundtyper",
      private: "Privat",
      b2b: "Business to business",
    },
  },
  en: {
    heroTitle: "Decision support for service flows",
    heroDesc:
      "Select case type, customer type, brand, and product category to get the recommended handling process. Update everything in Admin mode.",
    flowTitle: "Support Flow",
    labelCaseType: "Case Type",
    labelCustomerType: "Customer Type",
    labelBrand: "Brand",
    labelCategory: "Product Category",
    resultTitle: "Recommended Handling",
    resultPrompt: "Make your selections to get instructions.",
    flowVisualTitle: "Visual Flow",
    adminTitle: "Admin",
    openIntakeForm: "Open Brand Intake Form",
    csvTemplateBtn: "CSV Template",
    importCsvBtn: "Import CSV",
    exportJsonBtn: "Export JSON",
    importJsonBtn: "Import JSON",
    resetBtn: "Reset sample data",
    supplierFormTitle: "Add Supplier",
    brandFormTitle: "Add Brand",
    categoryFormTitle: "Add Product Category",
    ruleFormTitle: "Add Handling Rule",
    saveSupplierBtn: "Save Supplier",
    saveBrandBtn: "Save Brand",
    saveCategoryBtn: "Save Category",
    saveRuleBtn: "Save Rule",
    suppliersListTitle: "Suppliers",
    brandsListTitle: "Brands",
    categoriesListTitle: "Categories",
    rulesListTitle: "Rules",
    phName: "Name",
    phEmail: "Email",
    phNotes: "Notes",
    phBrand: "Brand",
    phCategory: "Product category",
    phHeadline: "Headline / short summary",
    phInstructions: "Handling steps (one line per step)",
    phResponsible: "Responsible (e.g. 1st line / Supplier)",
    phSla: "SLA (e.g. response within 24h)",
    allBrands: "All brands",
    allCategories: "All categories",
    addSupplierFirst: "Add a supplier first",
    noSupplier: "No supplier",
    unknownBrand: "Unknown brand",
    unknownCategory: "Unknown category",
    varying: "Varies",
    unknownSupplier: "Unknown supplier",
    notSet: "Not set",
    noRule: "No matching rule found.",
    match: "Match",
    responsible: "Responsible",
    sla: "SLA",
    flowNoRule: "No rule matched the selected combination.",
    flowStep1: "1. Case type",
    flowStep2: "2. Customer type",
    flowStep3: "3. Brand",
    flowStep4: "4. Product category",
    flowStep5: "5. Matched rule",
    flowStep6: "6. Routing",
    flowStep7: "7. Execute handling",
    noResponsible: "Responsible not set",
    noSla: "SLA not set",
    exportDone: "Export complete: JSON file downloaded.",
    csvTemplateDone: "CSV template downloaded.",
    importJsonDone: "Import complete: data updated from JSON file.",
    importJsonFail: "Import failed: {error}",
    csvEmpty: "CSV file is empty.",
    csvFail: "CSV import failed: {error}",
    csvDone:
      "CSV imported: {rules} rules, {suppliers} suppliers, {brands} brands, {categories} categories. Skipped rows: {skipped}.",
    savedLocalServerFail: "Saved locally but not to server: {error}",
    supplierSaved: "Supplier saved.",
    brandSaved: "Brand saved.",
    categorySaved: "Category saved.",
    ruleSaved: "Rule saved.",
    needSupplier: "Add a supplier before creating a brand.",
    resetDone: "Sample data reset.",
    syncedServer: "Synced with server data.",
    syncFail: "Could not sync server data: {error}",
    caseType: {
      all: "All case types",
      doa: "DOA (dead on arrival)",
      warranty: "Warranty after usage",
    },
    customerType: {
      all: "All customer types",
      private: "Private",
      b2b: "Business to business",
    },
  },
};

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
let currentLang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "sv";

function t(key) {
  const parts = key.split(".");
  let value = I18N[currentLang];
  for (const part of parts) value = value?.[part];
  return value || key;
}

function fmt(key, vars = {}) {
  return Object.entries(vars).reduce((acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)), t(key));
}

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

function isValidDataShape(data) {
  return (
    data.suppliers.length > 0 &&
    data.brands.length > 0 &&
    data.categories.length > 0 &&
    data.rules.length > 0
  );
}

function loadDataFromLocal() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(DEFAULT_DATA);
  try {
    const parsed = JSON.parse(raw);
    const normalized = normalizeData(parsed);
    if (!isValidDataShape(normalized)) return structuredClone(DEFAULT_DATA);
    return normalized;
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

let db = loadDataFromLocal();

function saveDataToLocal() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

async function pullFromServer() {
  const response = await fetch("/api/matrix", {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Server fetch failed (${response.status})`);

  const payload = normalizeData(await response.json());
  if (!isValidDataShape(payload)) throw new Error("Server returned invalid matrix payload.");

  db = payload;
  saveDataToLocal();
}

async function pushToServer() {
  const response = await fetch("/api/matrix", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(db),
  });
  if (!response.ok) throw new Error(`Server save failed (${response.status})`);

  const payload = normalizeData(await response.json());
  if (isValidDataShape(payload)) {
    db = payload;
    saveDataToLocal();
  }
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  document.getElementById("langSv")?.classList.toggle("active", currentLang === "sv");
  document.getElementById("langEn")?.classList.toggle("active", currentLang === "en");
}

function optionHtml(value, label) {
  return `<option value="${value}">${label}</option>`;
}

function labelForCaseType(id) {
  return t(`caseType.${id}`);
}

function labelForCustomerType(id) {
  return t(`customerType.${id}`);
}

function labelForBrand(id) {
  if (id === "all") return t("allBrands");
  return byId(db.brands, id)?.name || t("unknownBrand");
}

function labelForCategory(id) {
  if (id === "all") return t("allCategories");
  return byId(db.categories, id)?.name || t("unknownCategory");
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

  caseType.innerHTML = CASE_TYPES.map((x) => optionHtml(x, labelForCaseType(x))).join("");
  customerType.innerHTML = CUSTOMER_TYPES.map((x) => optionHtml(x, labelForCustomerType(x))).join("");
  brand.innerHTML = [optionHtml("all", t("allBrands"))]
    .concat(db.brands.map((b) => optionHtml(b.id, b.name)))
    .join("");
  category.innerHTML = [optionHtml("all", t("allCategories"))]
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

  supplierSel.innerHTML = db.suppliers.length
    ? db.suppliers.map((s) => optionHtml(s.id, s.name)).join("")
    : optionHtml("", t("addSupplierFirst"));

  ruleCase.innerHTML = CASE_TYPES.map((x) => optionHtml(x, labelForCaseType(x))).join("");
  ruleCustomer.innerHTML = CUSTOMER_TYPES.map((x) => optionHtml(x, labelForCustomerType(x))).join("");
  ruleBrand.innerHTML = [optionHtml("all", t("allBrands"))]
    .concat(db.brands.map((b) => optionHtml(b.id, b.name)))
    .join("");
  ruleCategory.innerHTML = [optionHtml("all", t("allCategories"))]
    .concat(db.categories.map((c) => optionHtml(c.id, c.name)))
    .join("");
}

function scoreRule(rule, input) {
  const keys = ["caseType", "customerType", "brandId", "categoryId"];
  let score = 0;
  for (const key of keys) {
    const wanted = input[key];
    const value = rule[key];
    if (value === wanted) score += 3;
    else if (value === "all") score += 1;
    else return -1;
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
    flowChart.innerHTML = `<div class="flow-step"><span class="step-label">Status</span><span class="step-value">${t("flowNoRule")}</span></div>`;
    return;
  }

  const matchedBrand = labelForBrand(rule.brandId);
  const matchedCategory = labelForCategory(rule.categoryId);
  const supplierName =
    rule.brandId === "all"
      ? t("varying")
      : byId(db.suppliers, byId(db.brands, rule.brandId)?.supplierId || "")?.name || t("unknownSupplier");

  const steps = [
    { label: t("flowStep1"), value: labelForCaseType(input.caseType) },
    { label: t("flowStep2"), value: labelForCustomerType(input.customerType) },
    { label: t("flowStep3"), value: labelForBrand(input.brandId) },
    { label: t("flowStep4"), value: labelForCategory(input.categoryId) },
    { label: t("flowStep5"), value: rule.headline },
    { label: t("flowStep6"), value: `${matchedBrand} -> ${supplierName} -> ${matchedCategory}` },
    {
      label: t("flowStep7"),
      value: `${rule.responsible || t("noResponsible")} | ${rule.sla || t("noSla")}`,
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
    result.innerHTML = `<h3>${t("resultTitle")}</h3><p>${t("noRule")}</p>`;
    renderFlowChart(input, null);
    return;
  }

  result.innerHTML = `
    <h3>${rule.headline}</h3>
    <p><strong>${t("match")}:</strong> ${labelForBrand(rule.brandId)} / ${labelForCategory(rule.categoryId)}</p>
    <p><strong>${t("responsible")}:</strong> ${rule.responsible || t("notSet")}</p>
    <p><strong>${t("sla")}:</strong> ${rule.sla || t("notSet")}</p>
    <ol>${rule.instructions.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;

  renderFlowChart(input, rule);
}

function renderLists() {
  document.getElementById("supplierList").innerHTML = db.suppliers
    .map((s) => `<li><strong>${s.name}</strong><br><small>${s.email || ""}</small></li>`)
    .join("");

  document.getElementById("brandList").innerHTML = db.brands
    .map((b) => {
      const supplier = byId(db.suppliers, b.supplierId);
      return `<li><strong>${b.name}</strong><br><small>${supplier?.name || t("noSupplier")}</small></li>`;
    })
    .join("");

  document.getElementById("categoryList").innerHTML = db.categories.map((c) => `<li>${c.name}</li>`).join("");

  document.getElementById("ruleList").innerHTML = db.rules
    .map(
      (r) =>
        `<li><strong>${r.headline}</strong><br><small>${labelForCaseType(r.caseType)} / ${labelForCustomerType(
          r.customerType,
        )} / ${labelForBrand(r.brandId)} / ${labelForCategory(r.categoryId)}</small></li>`,
    )
    .join("");
}

function setImportStatus(message, isError = false) {
  const statusEl = document.getElementById("importStatus");
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#b42318" : "var(--ink-muted)";
}

async function persistData(successMessage) {
  saveDataToLocal();
  try {
    await pushToServer();
    setImportStatus(successMessage);
  } catch (error) {
    setImportStatus(fmt("savedLocalServerFail", { error: error.message }), true);
  }
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
  setImportStatus(t("exportDone"));
}

function downloadCsvTemplate() {
  const header =
    "supplierName,supplierEmail,supplierNotes,brandName,categoryNames,caseType,customerType,headline,instructions,responsible,sla";
  const sample =
    '"Nordic Supply AB","support@nordicsupply.se","Returns via portal","AeroHome","Robotdammsugare|Skarm","doa","private","DOA replacement process","Validate defect||Create return label||Ship replacement","1st line + Warehouse","Response 4h / replacement 24h"';
  const payload = `${header}\n${sample}\n`;
  const blob = new Blob([payload], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "support-matrix-template.csv";
  a.click();
  URL.revokeObjectURL(url);
  setImportStatus(t("csvTemplateDone"));
}

async function importData(file) {
  if (!file) return;
  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    const normalized = normalizeData(parsed);
    if (!isValidDataShape(normalized)) {
      throw new Error("JSON is missing required data.");
    }
    db = normalized;
    await persistData(t("importJsonDone"));
    boot(true);
  } catch (error) {
    setImportStatus(fmt("importJsonFail", { error: error.message }), true);
  }
}

async function importCsv(file) {
  if (!file) return;
  try {
    const csvText = await file.text();
    if (!csvText.trim()) throw new Error(t("csvEmpty"));

    const response = await fetch("/api/intake/csv", {
      method: "POST",
      headers: { "Content-Type": "text/csv" },
      body: csvText,
    });

    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `CSV import failed (${response.status})`);

    await pullFromServer();
    boot(true);
    setImportStatus(
      fmt("csvDone", {
        rules: payload.createdRules,
        suppliers: payload.createdSuppliers,
        brands: payload.createdBrands,
        categories: payload.createdCategories,
        skipped: payload.skippedRows,
      }),
    );
  } catch (error) {
    setImportStatus(fmt("csvFail", { error: error.message }), true);
  }
}

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "sv";
  localStorage.setItem(LANG_KEY, currentLang);
  applyStaticTranslations();
  boot(true);
}

function bindEvents() {
  ["caseType", "customerType", "brand", "category"].forEach((id) => {
    document.getElementById(id).addEventListener("change", renderResult);
  });

  document.getElementById("langSv").addEventListener("click", () => setLanguage("sv"));
  document.getElementById("langEn").addEventListener("click", () => setLanguage("en"));

  document.getElementById("supplierForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    db.suppliers.push({
      id: uid("sup"),
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      notes: String(data.get("notes") || "").trim(),
    });
    await persistData(t("supplierSaved"));
    e.currentTarget.reset();
    boot(true);
  });

  document.getElementById("brandForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const supplierId = String(data.get("supplierId") || "").trim();
    if (!supplierId) {
      setImportStatus(t("needSupplier"), true);
      return;
    }

    db.brands.push({
      id: uid("bra"),
      name: String(data.get("name") || "").trim(),
      supplierId,
    });
    await persistData(t("brandSaved"));
    e.currentTarget.reset();
    boot(true);
  });

  document.getElementById("categoryForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    db.categories.push({
      id: uid("cat"),
      name: String(data.get("name") || "").trim(),
    });
    await persistData(t("categorySaved"));
    e.currentTarget.reset();
    boot(true);
  });

  document.getElementById("ruleForm").addEventListener("submit", async (e) => {
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
    await persistData(t("ruleSaved"));
    e.currentTarget.reset();
    boot(true);
  });

  document.getElementById("exportJson").addEventListener("click", exportData);
  document.getElementById("downloadCsvTemplate").addEventListener("click", downloadCsvTemplate);

  document.getElementById("importJson").addEventListener("change", async (e) => {
    await importData(e.target.files?.[0]);
    e.target.value = "";
  });

  document.getElementById("importCsv").addEventListener("change", async (e) => {
    await importCsv(e.target.files?.[0]);
    e.target.value = "";
  });

  document.getElementById("resetData").addEventListener("click", async () => {
    db = structuredClone(DEFAULT_DATA);
    await persistData(t("resetDone"));
    boot(true);
  });
}

function boot(isRebind = false) {
  const selected = isRebind ? readFlowInput() : null;
  applyStaticTranslations();
  fillFlowSelectors(selected);
  fillAdminSelectors();
  renderLists();
  renderResult();
  if (!isRebind) bindEvents();
}

async function init() {
  boot();
  try {
    await pullFromServer();
    boot(true);
    setImportStatus(t("syncedServer"));
  } catch (error) {
    setImportStatus(fmt("syncFail", { error: error.message }), true);
  }
}

init();
