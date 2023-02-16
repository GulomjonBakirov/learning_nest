function log(msg: string): void {
  console.log(`${new Date()}: ${msg}`);
}

function err(msg: string): void {
  console.error(`${new Date()}: ${msg}`);
}

export { log, err };
