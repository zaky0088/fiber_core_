let data = JSON.parse(localStorage.getItem("nocData")) || [];
let editIndex = -1;
function updateTime() {
  document.getElementById("time").innerText =
    new Date().toLocaleTimeString();
}
setInterval(updateTime, 1000);

function simpan() {
  localStorage.setItem("nocData", JSON.stringify(data));
}

function tambahData() {
  let d = {
    jalur: document.getElementById("jalur").value,
    odp: document.getElementById("odp").value,
    core: Number(document.getElementById("core").value),
    pot: Number(document.getElementById("pot").value),
    teknisi: document.getElementById("teknisi").value,
    status: document.getElementById("status").value
  };

  console.log("CURRENT EDIT INDEX:", editIndex); // debug

  if (editIndex === -1) {
    data.push(d);
  } else {
    data[editIndex] = d;
    editIndex = -1;
  }

  simpan();
  renderTable();
}


function edit(i) {
  let d = data[i];

  document.getElementById("jalur").value = d.jalur;
  document.getElementById("odp").value = d.odp;
  document.getElementById("core").value = d.core;
  document.getElementById("pot").value = d.pot;
  document.getElementById("teknisi").value = d.teknisi;
  document.getElementById("status").value = d.status;

  editIndex = i;

  console.log("EDIT INDEX:", editIndex); // debug
}

function renderTable() {
  let body = document.getElementById("tableBody");
  let search = document.getElementById("search").value.toLowerCase();

  body.innerHTML = "";

  let totalCore = 0;

  data.forEach((d, i) => {
    if (
      d.jalur.toLowerCase().includes(search) ||
      d.odp.toLowerCase().includes(search)
    ) {
      totalCore += d.core;

      body.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${d.jalur}</td>
          <td>${d.odp}</td>
          <td>${d.core}</td>
          <td>${d.pot}</td>
          <td>${d.teknisi}</td>
          <td>
            <span class="${d.status == "Active" ? "active" : "maintenance"}">
              ${d.status}
            </span>
          </td>
          <td>
            <button onclick="edit(${i})">Edit</button>
            <button onclick="hapus(${i})">Hapus</button>
          </td>
        </tr>
      `;
    }
  });

  document.getElementById("totalJalur").innerText = data.length;
  document.getElementById("totalCore").innerText = totalCore;
  document.getElementById("jalurPutus").innerText =
    data.filter(d => d.status == "Maintenance").length;
}

renderTable();
