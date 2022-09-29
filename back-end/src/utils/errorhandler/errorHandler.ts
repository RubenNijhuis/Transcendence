import { HttpException, HttpStatus } from "@nestjs/common";

function cleanLines(lines: string[]): string {
    var ret: string = "";

    for (let i = 0; i < lines.length; i++) {
        let lineNumber: string = lines[i].split(":").reverse()[1];
        let functionPath: string = lines[i].split(" ")[6];
        let cleanPath: string = functionPath.slice(1).split(":").reverse()[2];
        ret = ret.concat(... cleanPath + ": " + lineNumber + "\n");
    }
    return ret;
}

function getTraceUntilController(stack: string[]): string[] {
    const arr = stack.filter(e => (
            !e.includes("/app/node_modules") && !e.includes("node:")
        ));
    // change to 3 to start at function calling the errorhandler
    arr.splice(0, 3);
    return arr;
}

function debugLine(message: string): string {
    const e: Error = new Error();
    const rawTrace = getTraceUntilController(e.stack.split("\n"));
    const cleanTrace = cleanLines(rawTrace);
    const ret = "--BACKEND TRACE--\n" + 
        cleanTrace +
        "--BACKEND TRACE--";
    return ret;
}

export function errorHandler(error: Error, message: string, status: HttpStatus): HttpException {
    const debugMessage = debugLine(error.message);
    const ret = "\n--MESSAGE--\n" + message + "\n--MESSAGE--\n\n" + debugMessage;
    throw new HttpException(ret, status);
}