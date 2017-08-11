const Nightmare = require('nightmare');
const rp = require('request-promise');

const server = process.env.SERVER;
const api = process.env.API;

describe('Using Nightmare.js', () => {
  beforeEach(() => {
    nightmare = Nightmare({
      show: false
    });
  });

  it('check using request', async () => {
    let timestamp = new Date().getTime().toString();
    let url = `${server}/record`;
    let html = `
      <html>
        <body>
        <script>
        window.payload = {
            name: 'x',
            url: '${url}',
            timestamp: '${timestamp}' 
        };
        </script>
        <script src='${server}/client.js'></script>
        </body>
      </html>`;

    try {
      let window = await nightmare
        .on('console', (log, msg) => {
          console.log(msg);
        })
        .goto(`data:text/html,${html}`)
        .end();
    } catch (error) {
      expect(error).toBeNull();
      console.error(error);
    }

    let response = await rp(`${api}/${timestamp}`);

    let result = JSON.parse(response);
    expect(result.timestamp).toEqual('timestamp');
  });
});
