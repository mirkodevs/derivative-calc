var elt = document.getElementById("calculator");
var calculator = Desmos.GraphingCalculator(elt, {
  expressions: false,
});
const radice = "/sqrt{}";
function calculate() {
  calculator.removeExpression({ id: "user" });
  calculator.removeExpression({ id: "derivative" });

  const input = document.getElementById("functionInput").value;

  let expr;
  try {
    expr = math.parse(input);
  } catch (error) {
    alert("Funzione non valida");
    return;
  }
  // Calcola la derivata simbolica
  let derivative;
  try {
    derivative = math.derivative(expr, "x");
  } catch (error) {
    alert("Impossibile calcolare la derivata");
    return;
  }
  console.log(derivative);
  const desmosExpr = derivative.args.reduce(function (oneArg, acc) {
    return (acc += oneArg.name || oneArg.value);
  });

  console.log(desmosExpr, "der");
  calculator.setExpression({ id: "user", latex: input });
  calculator.setExpression({ id: "derivative", latex: desmosExpr });
}
function showJax(formula) {
  const formulaContainer = document.getElementById("formula");

  formulaContainer.innerHTML = "<p>" + formula + "</p>";

  // Richiama MathJax per renderizzare la formula aggiunta dinamicamente
  MathJax.typeset([formulaContainer]);
}

const operations = [
  "DELETE",
  "+",
  "-",
  "/",
  "^",
  "\u221A",
  "\u221B",
  "\u03C0",
  "(",
  ")",
];

const input = document.getElementById("functionInput");
const controls = document.querySelectorAll("#button-group button");
controls.forEach((one, idx) => {
  one.addEventListener("click", () => {
    if (idx !== 0) input.value += operations[idx];
    else input.value = "";
  });
});

const infoCont = document.getElementById("info-content");

function aboutView() {
  infoCont.innerHTML =
    "<h3>The Derivative Calculator lets you calculate derivatives of functions online  for free!</h3><p> Our calculator allows you to check your solutions to calculus exercises. It helps you practice by showing you the full working (step by step differentiation). The Derivative Calculator supports computing first, second,  fifth derivatives as well as differentiating functions with many variables (partial derivatives), implicit differentiation and calculating roots/zeros. You can also check your answers! Interactive graphs/plots help visualize and better understand the functions. For more about how to use the Derivative Calculator, go to Help or take a look at the examples. And now: Happy differentiating!</p>";
}

function help() {
  infoCont.innerHTML =
    '<p>Enter the function you want to differentiate into the Derivative Calculator. Skip the "f(x) =" part! The Derivative Calculator will show you a graphical version of your input while you type. Make sure that it shows exactly what you want. Use parentheses, if necessary, e. g. "a/(b+c)". In "Examples", you can see which functions are supported by the Derivative Calculator and how to use them. When youre done entering your function, click "Go!", and the Derivative Calculator will show the result below. In "Options" you can set the differentiation variable and the order (first, second,  derivative). You can also choose whether to show the steps and enable expression simplification.</p>';
}

function examples() {
  infoCont.innerHTML = "";

  infoCont.innerHTML += "<button>`x^2 - 1/3y + 0.7z`</button>";
  infoCont.innerHTML += "<button>`x / (x^2 + 1)`</button>";

  const exampleButtons = document.querySelectorAll("#info-content button");
  const input = document.getElementById("functionInput");

let exampleValues = []
exampleButtons.forEach((oneVal) => exampleValues.push(oneVal.innerHTML.slice(1,-1)));
  exampleButtons.forEach((one, idx) => {
    one.addEventListener("click", () => {
      input.value = exampleValues[idx];
    });
  });

  MathJax.typeset();
}
aboutView();
