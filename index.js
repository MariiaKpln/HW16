const arr1 = ["hello", "kuku", "abc"];
const arr2 = ["abc", "hello", "kuku"];
const arr3 = [1, 2, 3];
const arr4 = [3, 2, 1];

scripts = [
  'minMax(["hello", "kuku", "abc"])',
  'minMax(["abc", "hello", "kuku"])',
  "minMax([1, 2, 3])",
  "minMax([3, 2, 1])",
];

expectedResults = [
  ["abc", "kuku"],
  ["abc", "kuku"],
  [1, 5],
  [1, 3],
];

function myReduce(array, callback, initialValue) {
  let acc = initialValue ?? array[0];
  const index = initialValue == undefined ? 1 : 0;
  for (let i = 0; i < array.length; i += 1) {
    acc = callback(acc, array[i], i, array);
  }
  return acc;
}
function minMax(arr) {
  //TODO
  //arr is an array containing either strings or numbers
  // returns array with two elemnts: first is min value, second is max value
  //requirement: to use myReduce method described above

  const res = myReduce(
    arr,
    (acc, curr) => [
      acc[0] > curr ? curr : acc[0],
      acc[1] < curr ? curr : acc[1],
    ],
    [arr[0], arr[0]]
  );
  return res;
}

function test(testObj) {
  //testObj structure {script: <string containg script text>, expected: <any type>}
  //returns resultObj with structure {script: <string containg script text>,
  //  expectedJSON: <JSON string containing expected result>,
  //  actualJSON: <JSON string containing actual result>, result: <string containing either 'passed'
  //  or 'failed'
  const expectedJSON = JSON.stringify(testObj.expected);
  let evalRes;
  try {
    evalRes = eval(testObj.script);
  } catch (error) {
    evalRes = error;
  }
  const actualJSON = JSON.stringify(evalRes);
  const result = expectedJSON === actualJSON ? "passed" : "failed";
  const testResult = createTestResult(
    testObj.script,
    expectedJSON,
    actualJSON,
    result
  );
  return testResult;
}

function createTestResult(script, expectedJSON, actualJSON, result) {
  return { script, expectedJSON, actualJSON, result };
}

function testframework(scripts, expectedResults) {
  let passedTests = 0;
  let failedTests = 0;
  let testObj = makeObj(scripts, expectedResults);
  let result = createArray(testObj);
  result.map((el) => (el.result === "passed" ? passedTests++ : failedTests++));
  const bodyElement = document.querySelector("body");
  bodyElement.innerHTML = `${orderedList(result)}
  <p class="item green">Passed Tests: ${passedTests}</p>
<p class="item">Failed Tests: ${failedTests}</p>`;

  return result;
  //TODO
  //input
  //scripts - array of tested scripts
  //expectedResults - array of appropriate results
  //scrpits[i] and expectedResults[i] should be consistent
  /**************************************************************** */
  //output
  //bodyElem.innerHTML = <orderedList of test results with coloring legend: passed tests by green,
  //  failed tests by red. After list summary including number of passed tests and number of failed tests with
  //appropriate coloring (green /red)
  //presenting list items on the browser
}

function makeObj(scripts, expectedResults) {
  let testObjArray = scripts.reduce((acc, script, i) => {
    acc.push({
      script: script,
      expected: expectedResults[i],
    });
    return acc;
  }, []); // Начинаем с пустого массива
  return testObjArray;
}

function createArray(testObj) {
  let result = Object.values(testObj).reduce((acc, obj) => {
    const actual = test(obj); // Получаем результат выполнения скрипта
    acc.push(actual);

    return acc;
  }, []);
  return result;
}

function orderedList(array) {
  let items = array.map((el) => makeItems(el));
  return `<ul>${items}</ul>`;
}

function makeItems(el) {
  let res = `<li class="item">${el.script}</li><li class="item">${el.expectedJSON}</li><li class="item">${el.actualJSON}</li>`;

  if (el.result === "passed") {
    res = `<li class="item green">${el.script}</li><li class="item green">${el.expectedJSON}</li><li class="item green">${el.actualJSON}</li>`;
  }
  return res;
}

testframework(scripts, expectedResults);
