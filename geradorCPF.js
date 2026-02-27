class GeradorCPF {
  rand(min = 100000000, max = 999999999) {
    return String(Math.floor(Math.random() * (max - min) + min));
  }

  formatado(cpf) {
    return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6, 9) + "-" + cpf.slice(9, 11);
  }

  geraDigito(cpfSemDigitos) {
    const cpfArray = Array.from(cpfSemDigitos);
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
      ac += regressivo * Number(val);
      regressivo--;
      return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? "0" : String(digito);
  }

  geraNovoCpf() {
    const cpfSemDigitos = this.rand();
    const digito1 = this.geraDigito(cpfSemDigitos);
    const digito2 = this.geraDigito(cpfSemDigitos + digito1);
    const novoCpf = cpfSemDigitos + digito1 + digito2;
    return this.formatado(novoCpf);
  }
}

const gerador = new GeradorCPF();

const cpfDisplay = document.getElementById("cpf-display");
const generateButton = document.getElementById("generate-button");

generateButton.addEventListener("click", () => {
  cpfDisplay.textContent = gerador.geraNovoCpf();
});

// Adiciona evento de clique para copiar o CPF
cpfDisplay.addEventListener("click", () => {
  const cpfText = cpfDisplay.textContent;
  navigator.clipboard
    .writeText(cpfText)
    .then(() => {
      showAutoCloseAlert(2);
    })
    .catch((err) => {
      console.error("Falha ao copiar o CPF: ", err);
    });
});

// Gera um CPF ao carregar a página
cpfDisplay.textContent = gerador.geraNovoCpf();

function showAutoCloseAlert(durationInSeconds) {
  const alertElement = document.getElementById("myAlert");

  // Make the alert visible
  alertElement.style.display = "block";
  alertElement.style.opacity = "1"; // Ensure it's fully visible before starting the timer

  // Set a timer to close the alert
  setTimeout(function () {
    // Start fading out the alert
    alertElement.style.opacity = "0";

    // Wait for the transition to finish, then hide completely
    setTimeout(function () {
      alertElement.style.display = "none";
      alertElement.style.opacity = "1"; // Reset opacity for future use
    }, 150); // the CSS transition time is 0.25s
  }, durationInSeconds * 1000); // Convert seconds to milliseconds
}
