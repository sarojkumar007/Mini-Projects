import "./css/style.css";
import {
  calculateEMI,
  formatCurrency,
  formatDate,
  preciseRound,
} from "./utils";

function initApp(): void {
  (document.querySelector("#start-date") as HTMLInputElement).min = formatDate(
    new Date(),
    false
  );

  (document.querySelector("#emi_form") as HTMLFormElement).addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      // Gather User Input
      const principal = parseFloat(
        (document.querySelector("#principal") as HTMLInputElement).value ?? 0
      );
      const roi = parseFloat(
        (document.querySelector("#roi") as HTMLInputElement).value ?? 0
      );
      const tenure = parseFloat(
        (document.querySelector("#tenure") as HTMLInputElement).value ?? 0
      );
      const startDate = (
        document.querySelector("#start-date") as HTMLInputElement
      ).value;

      // Process Input

      const EMI = calculateEMI(principal, roi, tenure);
      const Total_Interest = preciseRound(EMI * tenure - principal);
      const Total_Amount = preciseRound(EMI * tenure);

      // Calc and Store Result
      const EMI_Listings = [];
      let EMI_Listings_HTML = `<table class="styled_table">
      <thead>
        <tr>
          <th>#</th>
          <th>Month</th>
          <th>EMI</th>
          <th>Principal</th>
          <th>Interest</th>
          <th>Remaining</th>
        </tr>
      </thead>
      <tbody>`;

      const emiMonth = new Date(startDate);
      let remaining_p = principal;

      for (let i = 1; i <= tenure; i++) {
        const i_value = remaining_p * (roi / 1200);
        const p_value = EMI - i_value;

        remaining_p -= p_value;

        EMI_Listings.push([
          formatDate(emiMonth),
          Math.round(Math.abs(remaining_p)),
          preciseRound(p_value),
          preciseRound(i_value),
        ]);

        EMI_Listings_HTML += `<tr>
        <td>${i}</td>
        <td>${formatDate(emiMonth)}</td>
        <td>${formatCurrency(Math.round(EMI))}</td>
        <td>${formatCurrency(preciseRound(p_value))}</td>
        <td>${formatCurrency(preciseRound(i_value))}</td>
        <td>${formatCurrency(Math.round(Math.abs(remaining_p)))}</td>
      </tr>`;

        emiMonth.setMonth(emiMonth.getMonth() + 1, emiMonth.getDate());
      }

      EMI_Listings_HTML += `</tbody></table>`;

      // Update the UI

      (document.querySelector("#emi_table") as HTMLDivElement).innerHTML =
        EMI_Listings_HTML;

      (document.querySelector("#emi_total") as HTMLDivElement).innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-3">
            <div>Principal: ${formatCurrency(principal)}</div>
            <div>Annual Rate of Interest (%): ${roi}</div>
            <div>Tenure(in Months): ${tenure}</div>
            <div>EMI: ${formatCurrency(EMI)}</div>
            <div>Total Interest: ${formatCurrency(Total_Interest)}</div>
            <div>Total Amount: ${formatCurrency(Total_Amount)}</div>
          </div>
      `;
    }
  );

  (document.querySelector("#emi_form") as HTMLFormElement).addEventListener(
    "reset",
    () => {
      (document.querySelector("#emi_table") as HTMLDivElement).innerHTML = "";
      (document.querySelector("#emi_total") as HTMLDivElement).innerHTML = ``;
    }
  );
}

document.addEventListener("DOMContentLoaded", initApp);
