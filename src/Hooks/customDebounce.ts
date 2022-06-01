import React from "react";

const useDebounce = () => {};

export default useDebounce;

const test1 = (fn: any) => {
    let isDone = false;
    return function () {
        if (isDone) return;
        fn();
        isDone = true;
        setTimeout(() => {
            isDone = false;
        }, 1000);
    };
};
const showLog = () => console.log(123);
const debounce = test1(showLog);
