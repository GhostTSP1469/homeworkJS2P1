let app = document.querySelector("#app");

app.innerHTML = `
  <div class="card">
    <div class="top">COMPANY NAME</div>

    <div class="photo">
      <img src="data:image/jpeg;base64,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">
    </div>

    <h2>Laura Anderson</h2>
    <p class="job">Web Design & Developer</p>

    <div class="info">
      <p><b>ID:</b> 9876543210</p>
      <p><b>DOB:</b> 00-00-00</p>
      <p><b>Phone:</b> (21) 531 4262</p>
      <p><b>Email:</b> your-mail@here</p>
      <p><b>Join:</b> 12-09-2018</p>
      <p><b>Expire:</b> 13-09-2023</p>
    </div>

    <div class="bottom">/ brandname</div>
  </div>
`;

const card = document.querySelector(".card");
card.style.width = "300px";
card.style.margin = "50px auto";
card.style.fontFamily = "Arial";
card.style.background = "#fff";
card.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
card.style.textAlign = "center";

const topBlock = document.querySelector(".top");
topBlock.style.background = "#444";
topBlock.style.color = "#fff";
topBlock.style.padding = "15px";
topBlock.style.fontWeight = "bold";

const photo = document.querySelector(".photo");
photo.style.background = "#7fd1c7";
photo.style.padding = "20px";

const img = document.querySelector("img");
img.style.width = "80px";
img.style.height = "80px";
img.style.borderRadius = "50%";
img.style.border = "4px solid white";

const job = document.querySelector(".job");
job.style.color = "#7fd1c7";

const info = document.querySelector(".info");
info.style.textAlign = "left";
info.style.padding = "0 20px";

const bottom = document.querySelector(".bottom");
bottom.style.background = "#7fd1c7";
bottom.style.color = "#fff";
bottom.style.padding = "10px";
