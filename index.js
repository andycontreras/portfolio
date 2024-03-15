const obj = {
  mainUrl: "https://preview.contentful.com",
  spaceId: "iyew3lkuir6k",
  enviromentID: "master",
  accesstoken: "J527i1IVNkqcxu6Gr1y_lUSHZXEnywTkS8QBfX-B_SU",
};

function getFetch() {
  const url =
    "https://preview.contentful.com/spaces/iyew3lkuir6k/environments/master/entries?access_token=J527i1IVNkqcxu6Gr1y_lUSHZXEnywTkS8QBfX-B_SU";
  fetch(
    // url
    `${obj.mainUrl}/spaces/${obj.spaceId}/environments/${obj.enviromentID}/entries?access_token=${obj.accesstoken}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const dt = data.items;
      const img = data.includes.Asset;
      const imgbank = {
        cachapa: {
          id: img[0].sys.id,
          url: img[0].fields.file.url,
        },
        hummus: {
          id: img[1].sys.id,
          url: img[1].fields.file.url,
        },
      };

      const container = document.querySelector(".main__projects-cards");
      const template = document.querySelector(".template-projects-cards");

      for (const re of dt) {
        const idImgContent = re.fields.preview.sys.id;
        if (idImgContent === imgbank.cachapa.id) {
          const imagen = template.content.querySelector(".projects-card__img");
          imagen.src = imgbank.cachapa.url;
        } else if (idImgContent === imgbank.hummus.id) {
          const imagen = template.content.querySelector(".projects-card__img");
          imagen.src = imgbank.hummus.url;
        }

        const tttl = template.content.querySelector(".pojects-tittle");
        tttl.textContent = re.fields.tittle;

        const descrp = template.content.querySelector(".project-description");
        descrp.textContent = re.fields.description;

        const link = template.content.querySelector(".project--link");
        link.href = re.fields.enlace;
        console.log(re.fields.enlace);
        const clone = document.importNode(template.content, true);
        container.append(clone);
      }
    });
}

// function getFetch() {
//   fetch(
//     url +
//       "/spaces/" +
//       spaceId +
//       "/environments/" +
//       enviroment +
//       "/entries?access_token=" +
//       token
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       const d = data;
//       const img = d.includes.Asset[0].fields.file.url;
//       const j = JSON.stringify(data.items);
//       imageCard.src = img;
//       console.log(img);
//     });
// }

function main() {
  getFetch();
}
main();
