let data = JSON.parse(localStorage.getItem("nocData")) || [];

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
    jalur: jalur.value,
    odp: odp.value,
    core: Number(core.value),
    pot: Number(pot.value),
    teknisi: teknisi.value,
    status: document.getElementById("status").value
  };

  data.push(d);
  simpan();
  renderTable();
}

function hapus(i) {
  data.splice(i, 1);
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

  editIndex = i; // simpan index
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
