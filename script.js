let conta = 0
let pessoas = 0
let porcentagem = 0

const contaInput = document.querySelector("#conta")
const pessoasInput = document.querySelector("#pessoas")
const botoesGorjeta = document.querySelectorAll(".gorjeta input[type='button']")
const gorjetaInput = document.querySelector("#outra")
const paragrafoErro = document.querySelector(".pessoas #erro")
const divErro = document.querySelector(".pessoas .input-box")
const gorjetaTotal = document.querySelector(".gorjeta-total > strong")
const total = document.querySelector(".total > strong")
const botaoLimpar = document.querySelector(".resultados button")

contaInput.addEventListener("input", receberValorConta)
pessoasInput.addEventListener("input", receberQuantidadePessoas)
gorjetaInput.addEventListener("input", receberPorcentagemPersonalizada)
botaoLimpar.addEventListener("click", limpar)

botoesGorjeta.forEach(botao => {
  botao.addEventListener("click", receberPorcentagem)
})

function receberValorConta(evento) {
  conta = Number(evento.target.value)
  calcular()
}

function receberQuantidadePessoas(evento) {
  pessoas = Number(evento.target.value)

  if (evento.target.value === "0") {
    paragrafoErro.style.display = "block"
    divErro.setAttribute("id", "erro-div")
  } else {
    paragrafoErro.style.display = "none"
    divErro.removeAttribute("id")
  }

  calcular()
}

function receberPorcentagem(evento) {
  botoesGorjeta.forEach(botao => {
    botao.classList.remove("botao-ativo")
  })

  evento.target.classList.add("botao-ativo")
  gorjetaInput.value = ""
  porcentagem = parseFloat(evento.target.value) / 100

  calcular()
}

function receberPorcentagemPersonalizada(evento) {
  botoesGorjeta.forEach(botao => {
    botao.classList.remove("botao-ativo")
  })

  porcentagem = Number(evento.target.value) / 100

  calcular()
}

function calcular() {
  if (conta <= 0 || pessoas <= 0) {
    gorjetaTotal.textContent = "R$ 0.00"
    total.textContent = "R$ 0.00"
    return
  }

  const valorGorjeta = conta * porcentagem
  const gorjetaPorPessoa = valorGorjeta / pessoas
  const totalPorPessoa = (conta + valorGorjeta) / pessoas

  gorjetaTotal.textContent = `R$ ${gorjetaPorPessoa.toFixed(2)}`
  total.textContent = `R$ ${totalPorPessoa.toFixed(2)}`
}

function limpar() {
  conta = 0
  pessoas = 0
  porcentagem = 0

  contaInput.value = ""
  pessoasInput.value = ""
  gorjetaInput.value = ""

  botoesGorjeta.forEach(botao => {
    botao.classList.remove("botao-ativo")
  })

  paragrafoErro.style.display = "none"
  divErro.removeAttribute("id")

  gorjetaTotal.textContent = "R$ 0.00"
  total.textContent = "R$ 0.00"
}