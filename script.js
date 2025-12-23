/***********************
 * VARIABLES GLOBALES
 ***********************/
let cart = [];

/***********************
 * MENU
 ***********************/
function toggleMenu() {
    const menu = document.getElementById("side-menu");
    const overlay = document.getElementById("overlay");
    if (!menu || !overlay) return;

    menu.classList.toggle("open");
    overlay.classList.toggle("show");
}

/***********************
 * PANIER (OUVRIR / FERMER)
 ***********************/
function toggleCart() {
    const cartPanel = document.getElementById("cart-panel");
    const overlay = document.getElementById("cart-overlay");
    if (!cartPanel || !overlay) return;

    cartPanel.classList.toggle("open");
    overlay.classList.toggle("show");
}

/***********************
 * AJOUT AU PANIER
 ***********************/
function ajouterPanier(nom, prix) {
    cart.push({ nom: nom, prix: prix });
    updatePanier();
}

/***********************
 * AFFICHAGE PANIER
 ***********************/
function updatePanier() {
    const cartItems = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");
    const countEl = document.getElementById("cart-count");

    if (!cartItems || !totalEl) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.prix;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nom} - ${item.prix} FCFA
            <button onclick="supprimerProduit(${index})">❌</button>
        `;
        cartItems.appendChild(li);
    });

    totalEl.textContent = total;
    if (countEl) countEl.textContent = cart.length;
}
const badge = document.getElementById("cart-count");
badge.classList.add("bump");
setTimeout(() => badge.classList.remove("bump"), 300);
/***********************
 * SUPPRIMER PRODUIT
 ***********************/
function supprimerProduit(index) {
    cart.splice(index, 1);
    updatePanier();
}/***********************
 * CATÉGORIES
 ***********************/
function filtrer(categorie) {
    const produits = document.querySelectorAll(".product-card");

    produits.forEach(produit => {
        const cat = produit.getAttribute("data-category");

        if (categorie === "all" || cat === categorie) {
            produit.style.display = "block";
        } else {
            produit.style.display = "none";
        }
    });
}

// si le menu appelle choisirCategorie()
function choisirCategorie(categorie) {
    filtrer(categorie);
    toggleMenu(); // ferme le menu après clic
}/***********************
 * WHATSAPP
 ***********************/
function payerWhatsApp() {
    if (cart.length === 0) {
        alert("Votre panier est vide");
        return;
    }

    // 🔹 Infos livraison
    const nom = document.getElementById("nom").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const adresse = document.getElementById("adresse").value.trim();

    if (!nom || !telephone || !adresse) {
        alert("Veuillez remplir les informations de livraison");
        return;
    }

    // 🔹 Message WhatsApp
    let message = "🛒 COMMANDE YYAO BOUTIK\n\n";

    let total = 0;
    cart.forEach(item => {
        message += `• ${item.nom} : ${item.prix} FCFA\n`;
        total += item.prix;
    });

    message += `\n💰 Total : ${total} FCFA\n\n`;
    message += "📦 INFORMATIONS DE LIVRAISON\n";
    message += `👤 Nom : ${nom}\n`;
    message += `📞 Téléphone : ${telephone}\n`;
    message += `📍 Adresse : ${adresse}\n\n`;
    message += "🚚 Livraison : Abidjan 24h | Intérieur 48–72h";

    // 🔹 Ouverture WhatsApp (fiable sur iPhone)
    window.location.href =
        "https://wa.me/2250150062259?text=" + encodeURIComponent(message);
}function rechercherProduit() {
    const input = document.getElementById("search").value.toLowerCase();
    const produits = document.querySelectorAll(".product-card");

    produits.forEach(p => {
        const nom = p.querySelector("h4").textContent.toLowerCase();
        p.style.display = nom.includes(input) ? "block" : "none";
    });
}