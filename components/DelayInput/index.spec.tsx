/*
    テスト内容
    ・初期の表示は空である
    ・入力直後は「入力中」と表示される
    ・入力して1秒経過した後に入力した内容が表示される
    ・入力して1秒経過した後にonChangeコールバックが呼ばれる
*/

import { fireEvent } from '@storybook/testing-library'
import { render, screen, RenderResult } from '@testing-library/react'
import { DelayInput } from './index'

// DelayInputコンポーネントに関するテスト
describe('DelayInput', () => {
    let renderResult: RenderResult
    let handleChange: jest.Mock

    beforeEach(() => {
        // モック関数を作成する
        handleChange = jest.fn()
        /*
            jest.fn()
            モック関数を作成する関数 コールバックが呼ばれたかなどテストできる
        */

        // モック関数をDelayInputに渡して描画
        renderResult = render(<DelayInput onChange={ handleChange } />)
    })

    afterEach(() => {
        renderResult.unmount()
    })

    // span要素のテキストが空であることをテスト
    it('should display empty in span on initial render', () => {
        const spanNode = screen.getByTestId('display-text') as HTMLSpanElement

        // 初期表示は空
        expect(spanNode).toHaveTextContent('入力したテキスト')
    })

    // 入力直後はspan要素が「入力中・・・」と表示するテスト
    it('should display 「入力中・・・」 immediately after onChange event occurs', () => {
        const inputText = 'Test Input Text'
        const inputNode = screen.getByTestId('input-text') as HTMLInputElement

        // inputのonChangeイベントを呼びだす
        fireEvent.change(inputNode, { target: { value: inputText } })
         
        const spanNode = screen.getByTestId('display-text') as HTMLSpanElement

        // 入力中と表示するか確認
        expect(spanNode).toHaveTextContent('入力中・・・')
    })
})