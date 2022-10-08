import { render, screen, RenderResult } from "@testing-library/react";
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
})