// const read
const { promises: fsPromises } = require("fs");

function factorial(n) {
  var total = 1;
  for (i = 1; i <= n; i++) {
    total = total * i;
  }
  return total;
}

async function asyncReadFile(filename) {
  try {
    const contents = await fsPromises.readFile(filename, "utf-8");

    const arr = contents.split(/\r?\n/);

    return arr;
  } catch (err) {
    console.log(err);
  }
}


function combine(list) {
  var pairs = new Array((list.length * (list.length - 1)) / 2),
    pos = 0;

  for (var i = 0; i < list.length; i++) {
    for (var j = i + 1; j < list.length; j++) {
      pairs[pos++] = [list[i], list[j]];
    }
  }
  return pairs;
}

const getDays = (arr, finder) => {
  arr.filter((item) => {
    if (item.name === finder) {
      return (days = item.days);
    }
  });

  return days.map((day) => {
    return { [day.substring(0, 2)]: day.substring(2).split("-") };
  });
};

function inRange(day1, day2) {
  let hour1 = day1.split(":")[0];
  let minute1 = day1.split(":")[1];
  let hour2 = day2.split(":")[0];
  let minute2 = day2.split(":")[1];
  // console.log(hour1, minute1, hour2, minute2)
  let date1 = new Date(new Date().setHours(hour1, minute1, 0, 0));
  let date2 = new Date(new Date().setHours(hour2, minute2, 0, 0));

  let conditionI = new Date(date1.setHours(date1.getHours() - 2));
  let conditionS = new Date(date1.setHours(date1.getHours() + 2));

  // console.log(conditionI, date2 ,conditionS );
  // console.log(day1, day2,conditionI.getTime() <= date2.getTime(), conditionS.getTime() >= date2.getTime());
  if (
    conditionI.getTime() <= date2.getTime() &&
    conditionS.getTime() >= date2.getTime()
  ) {
    return true;
  } else return false;
}

const getCount = (parPerson, arrOfObj) => {
  const arrDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  var str = parPerson.join("-");
  let count = 0;
  let aux1;
  let aux2;

  for (let i = 0; i < arrDays.length; i++) {
    aux1 = getDays(arrOfObj, parPerson[0]).find((e) => e[arrDays[i]]);
    aux2 = getDays(arrOfObj, parPerson[1]).find((e) => e[arrDays[i]]);

    if (aux1 !== undefined && aux2 !== undefined) {
      if (inRange(aux1[arrDays[i]][0], aux2[arrDays[i]][0])) {
        count++;
      }
      console.log("count", count, aux1, aux2);
    }
  }
  return str + ": " + count;
};


asyncReadFile("./datos.txt").then((arrSplit) => {
  const combinacionesPosibles =
    factorial(arrSplit.length) /
    (factorial(2) * factorial(arrSplit.length - 2));
    
  console.log("combinacionesPosibles", combinacionesPosibles);

  const arrOfObj = arrSplit.map((item) => {
    return { name: item.split("=")[0], days: item.split("=")[1].split(",") };
  });

  let personCombine = combine(
    arrOfObj.map((item) => {
      return item.name;
    })
  );
  console.log("personCombine", personCombine);

  for (let i = 0; i < personCombine.length; i++) {
    console.log(getCount(personCombine[i], arrOfObj));
    /* console.log(
    personCombine[i],
    getDays(arrOfObj, personCombine[i][0]),
    getDays(arrOfObj, personCombine[i][1])
  ); */
  }

  /*   console.log(
    new Date(new Date().setHours(12, 4)).getTime() <
      new Date(new Date().setHours(12, 3)).getTime()
  ); */
});
