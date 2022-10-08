import { render, screen, RenderResult, fireEvent } from "@testing-library/react";
import { Input } from './index'

// describeで処理をまとめる
// 今回はInputコンポーネントのテストを行うので「Input」という名前のグループを作成し、その中でテストを書いていく
describe('Input', () => {
    let renderResult: RenderResult

    // それぞれのテストケース前にコンポーネントを描画し、renderResultにセットする
    beforeEach(() => {
        renderResult = render(<Input id="username" label="Username" />)
    })

    // テストケース終了後に描画していたコンポーネントを開放する
    afterEach(() => {
        renderResult.unmount()
    })

    // itの中に実際のテストを書いていく
    //初期描画時にinput要素が空であることをテスト
    it('should empty in input on initial render', () => {
        // labelがUsernameであるコンポーネントに対するinputの要素を取得する。
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement

        // input要素の表示が空か確認する。
        expect(inputNode).toHaveValue('')
    })

    // 文字を入力したら、入力した内容が表示されるかをテスト
    it('should show input text', () => {
        const inputText = 'Test Input Text'
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement

        // fireEventを使って、input要素のonChangeイベントが発火する
        fireEvent.change(inputNode, { target: {value: inputText } })

        /*
            fireEvent
            第一引数にinputのDOMを、第二引数のオブジェクトの中に入力する文字列を指定する
            fireEventを呼ぶことで、対象のDOMのイベントを発行し、Inputコンポーネントがイベントを取得して状態を書き換えてinputの表示を更新する。
        */

        // input要素に入力したテキストが表示されているか確認する
        expect(inputNode).toHaveValue(inputText)
    })

    // ボタンが押されたら、入力テキストがクリアするかチェック
    it('should reset when user clicks button', async () => {
        // 最初にinputにテキストを入力する
        const inputText = 'Test Input Text'
        const inputNode = screen.getByLabelText('Username') as HTMLInputElement
        fireEvent.change(inputNode, { target: { value: inputText } })

        // buttonを取得する
        const buttonNode = screen.getByRole('button', {
            name: 'Reset',
        }) as HTMLButtonElement

        /*
            getByRole
            DOMにroleやaria-labelなどのロールが設定されている場合、ロールに応じてマッチするDOMを取得するための関数
            buttonにはデフォルトでbuttonというroleが暗黙的に指定されている。
            このためgetByRoleでDOMを取得することができる

            getByRole関数の第二引数のオブジェクトにボタンで表示しているテキストを指定して、どのボタンかを指定して取得する
        */

        // ボタンをクリックする
        fireEvent.click(buttonNode)

        // input要素の表示が空か確認する
        expect(inputNode).toHaveValue('')
    })
})