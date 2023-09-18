import * as childProcess from 'child_process';

describe('TcpService (e2e)', () => {
  const tcpPort = Number(process.env.TCP_PORT) || 8080;

  it('Hex Data with Ping command sent by device should return the right Ping ACK Data', async () => {
    const input = '50F70A3F730150494E4773C4';
    const command = `echo -n ${input} | xxd -r -p | nc -v localhost ${tcpPort}`;

    const output = childProcess.execSync(command, { encoding: 'utf8' });

    // The socket server should send back '50F70150494E4773C4'
    const expectedOutput = '50F70150494E4773C4';
    expect(output.trim()).toEqual(expectedOutput);
  });

  it('Hex Data with Location command sent by device should return a message confirming that Location was successfully received', async () => {
    const input =
      '50F70A3F73025EFCF950156F017D784000008CA0F80084003C013026A1029E72BD73C4';
    const command = `echo -n ${input} | xxd -r -p | nc -v localhost ${tcpPort}`;

    const output = childProcess.execSync(command, { encoding: 'utf8' });

    const expectedOutput = 'Location acquired';
    expect(output.trim()).toEqual(expectedOutput);
  });

  it('Hex Data with Location command sent by device should return a message confirming that Location was successfully received', async () => {
    const input =
      '50F70A3F73025EFCF950156F017D784000008CA0F8003C013026A1029E72BD73C4';
    const command = `echo -n ${input} | xxd -r -p | nc -v localhost ${tcpPort}`;

    const output = childProcess.execSync(command, { encoding: 'utf8' });

    const expectedOutput = 'Location acquired';
    expect(output.trim()).toEqual(expectedOutput);
  });
});
