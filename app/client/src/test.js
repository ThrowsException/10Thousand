const bar = () => {
    return new Promise((res, rej) => {
       res("Im Done now");
    });
}

const t = async () => {
    console.log("things");
    let foo = bar();
    console.log("more things");
    console.log(await foo);
}

t();