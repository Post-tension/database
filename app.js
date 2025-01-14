const SPREADSHEET_ID = "1O29p24mJmX-fvEtLw3Ia1WSmh-_nVS_AdOk8Ap6hoq0";
const API_KEY = "AIzaSyAaoonqQDk_uxT9gIaH0ctGzcVvwcdtSa0";
const RANGE = "Sheet1!A1:Q267"; // Ganti sesuai range spreadsheet Anda

// Fungsi mengambil data dari Google Sheets
async function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.values) {
        displayTable(data.values);
    } else {
        alert("Gagal mengambil data dari spreadsheet.");
    }
}

// Fungsi menampilkan data di tabel
function displayTable(data) {
    const tableHead = document.getElementById("table-head");
    const tableBody = document.getElementById("table-body");

    // Header tabel
    tableHead.innerHTML = "";
    data[0].forEach((header) => {
        tableHead.innerHTML += `<th>${header}</th>`;
    });

    // Body tabel
    tableBody.innerHTML = "";
    data.slice(1).forEach((row) => {
        const rowHTML = row.map((cell) => `<td>${cell}</td>`).join("");
        tableBody.innerHTML += `<tr>${rowHTML}</tr>`;
    });
}

// Konfigurasi QR Code
function initQRCode() {
    const qrReader = new Html5Qrcode("reader");
    qrReader.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250,
        },
        (decodedText) => {
            document.getElementById("qr-result").innerText = `Data: ${decodedText}`;
        },
        (errorMessage) => {
            console.log("QR Code scan error:", errorMessage);
        }
    ).catch((err) => {
        console.error("Error starting QR Code scanner:", err);
    });
}

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    initQRCode();
});

function initQRCode() {
    const qrReader = new Html5Qrcode("reader");

    const startScanner = () => {
        qrReader.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 200 },
            (decodedText) => {
                document.getElementById("qr-result").innerText = `Data: ${decodedText}`;
            },
            (errorMessage) => {
                console.log("QR Code scan error:", errorMessage);
            }
        ).catch((err) => {
            console.error("Error starting QR Code scanner:", err);
        });
    };

    const stopScanner = () => {
        qrReader.stop().then(() => {
            console.log("QR Code scanner stopped.");
        }).catch((err) => {
            console.error("Error stopping QR Code scanner:", err);
        });
    };

    // Start scanner on modal open
    const qrModal = document.getElementById('qrModal');
    qrModal.addEventListener('shown.bs.modal', startScanner);

    // Stop scanner on modal close
    qrModal.addEventListener('hidden.bs.modal', stopScanner);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    initQRCode();
});

