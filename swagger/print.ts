import puppeteer, { Page } from 'puppeteer'

const output = './index.pdf'
import path from 'path'

const removeElementsForPDF = async (page: Page): Promise<void> => {
  // 指定要素が確認できるまで待機
  await Promise.all(['.sc-brqgnP', '.tab-error', 'details'].map((e) => new Promise((r) => setTimeout(r, 5000))))

  await page.evaluate(() => {
    ;[
      '.sc-brqgnP', // Response samplesの各種ボタン
      '.tab-error' // Response samplesのエラーのタブ
    ].forEach((selector) => {
      const buttons = document.querySelectorAll<HTMLElement>(selector)
      buttons.forEach((button) => (button.style.display = 'none'))
    })
    // マークダウンの折り畳みを展開
    const details = document.getElementsByTagName('details')
    for (let index = 0; index < details.length; index++) {
      details[index].setAttribute('open', '')
    }
  })
}

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(`file:${path.join(__dirname, 'index.html')}`)

  // PDFに不要なタブやクリック要素は削除
  await removeElementsForPDF(page)

  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '10mm',
      right: '10mm',
      left: '10mm',
      bottom: '10mm'
    }
  })

  await browser.close()
})()
