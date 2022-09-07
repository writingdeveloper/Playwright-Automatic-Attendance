const { chromium } = require("playwright");
const got = require("got");

async function start() {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50,
  });
  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();
  await page.goto("http://tcafe2a.com/bbs/login.php");
  await page.setViewportSize({
    width: 1920,
    height: 969,
  });
  await page.waitForSelector("#login_id");
  await page.click("#login_id");
  await page.type("#login_id", process.env.TCAFE_ID || "");
  await page.waitForSelector("#login_pw");
  await page.click("#login_pw");
  await page.type("#login_pw", process.env.TCAFE_PASSWORD || "");
  await navigationPromise;
  await page.waitForSelector(
    "#thema_wrapper > div > div.at-body > div > div > div > div > div.form-box > div.form-body > form > div.row > div:nth-child(2) > button"
  );
  await page.click(
    "#thema_wrapper > div > div.at-body > div > div > div > div > div.form-box > div.form-body > form > div.row > div:nth-child(2) > button"
  );
  await navigationPromise;
  await page.goto("http://tcafe2a.com/community/attendance");
  await page.waitForSelector(
    "#cnftjr > div > form > table > tbody > tr > td > img"
  );
  await page.click("#cnftjr > div > form > table > tbody > tr > td > img");
  await navigationPromise;
  await got.post(process.env.DISCORD_WEBHOOK, {
    json: {
      content: `🚨${new Date()}\n✅T Cafe 출석 완료 보고드립니다!✅`,
    },
  });
  await page.goto("https://svrforum.com/home/login");
  await page.waitForSelector("#uid");
  await page.click("#uid");
  await page.type("#uid", prcess.env.SVR_ID);
  await page.click("#upw");
  await page.type("#upw", process.env.SVR_PASSWORD);
  await page.waitForSelector(
    "#fo_member_login > fieldset > div:nth-child(2) > input.app-button.app-button-expand.primary"
  );
  await page.click(
    "#fo_member_login > fieldset > div:nth-child(2) > input.app-button.app-button-expand.primary"
  );
  await page.goto("https://svrforum.com/attendance");
  await page.waitForSelector("#click_button > span > button");
  await page.click("#click_button > span > button");
  await got.post(process.env.DISCORD_WEBHOOK, {
    json: {
      content: `🚨${new Date()}\n✅SVR FORUM 출석 완료 보고드립니다!✅`,
    },
  });
  await navigationPromise;
  await browser.close();
}
start();
