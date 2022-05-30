//EXEMPLO DO CÓDIGO PARA UM PRODUTO
function productItem(product) {
  const item = `<div class="product" data-name="${product.name}" data-brand="${
    product.brand
  }" data-type="${product.product_type}" tabindex="508">
  <figure class="product-figure">
    <img src="${product.api_featured_image}" width="215" height="215" alt="${
    product.name
  }" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name}</h1>
    <div class="product-brands"><span class="product-brand background-brand">${
      product.brand
    }</span>
<span class="product-brand background-price">R$ ${product.price}</span></div>
  </section>
  
  ${loadDetails(product)}
</div>`;

  return item;
}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.price}</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.category}</div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.product_type}</div>
        </div>
      </div></section>`;

  return details;
}

async function getProdutcs({ name, brand, type }) {
  let baseUrl = "https://makeup-api.herokuapp.com/api/v1/products.json";

  if (brand || type) {
    baseUrl += "?";

    if (brand && type) {
      baseUrl += `brand=${brand}&product_type=${type}`;
    } else {
      baseUrl += brand ? `brand=${brand}` : `product_type=${type}`;
    }
  }

  products = await (await fetch(baseUrl)).json();

  if (name) {
    products = products.filter((product) => {
      return product.name.toUpperCase().trim() === name.toUpperCase().trim();
    });
  }

  return products;
}

async function loadPage() {
  const catalog = document.getElementById("catalog");
  const sort = document.getElementById("sort-type");

  let filter = {
    name: document.getElementById("filter-name").value,
    brand: document.getElementById("filter-brand").value,
    type: document.getElementById("filter-type").value,
  };

  const products = await getProdutcs(filter);

  //ordernar lista
  switch (sort.value) {
    case "0":
      // melhores avaliados
      products.sort((p1, p2) => {
        const r1 = p1.rating == null ? 0 : p1.rating;
        const r2 = p2.rating == null ? 0 : p2.rating;

        return r2 - r1;
      });

      break;
    case "1":
      // menores preços
      products.sort((p1, p2) => {
        const r1 = p1.price == null ? 0 : p1.price;
        const r2 = p2.price == null ? 0 : p2.price;

        return r1 - r2;
      });

      break;
    case "2":
      // maiores preços
      products.sort((p1, p2) => {
        const r1 = p1.price == null ? 0 : p1.price;
        const r2 = p2.price == null ? 0 : p2.price;

        return r2 - r1;
      });

      break;
    case "3":
      // A-Z
      products.sort((p1, p2) => {
        const r1 = p1.name == null ? "" : p1.name;
        const r2 = p2.name == null ? "" : p2.name;

        if (r1 < r2) {
          return -1;
        }

        if (r1 > r2) {
          return 1;
        }

        return 0;
      });

      break;
    case "4":
      // Z-A
      products.sort((p1, p2) => {
        const r1 = p1.name == null ? "" : p1.name;
        const r2 = p2.name == null ? "" : p2.name;

        if (r1 > r2) {
          return -1;
        }

        if (r1 < r2) {
          return 1;
        }

        return 0;
      });

      break;
    default:
      // melhores avaliados
      products.sort((p1, p2) => {
        const r1 = p1.rating == null ? 0 : p1.rating;
        const r2 = p2.rating == null ? 0 : p2.rating;

        return r2 - r1;
      });
  }

  let texto = products.map((product) => {
    product.price = product.price * 5.5;
    product.price = product.price.toFixed(2);

    product.rating = !product.rating ? 0 : product.rating;

    return productItem(product);
  });

  texto;

  catalog.innerHTML = texto.join("");
}

loadPage();
