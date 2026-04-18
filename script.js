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
    status: status.value
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
  jalur.value = d.jalur;
  odp.value = d.odp;
  core.value = d.core;
  pot.value = d.pot;
  teknisi.value = d.teknisi;
  status.value = d.status;

  hapus(i);
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
