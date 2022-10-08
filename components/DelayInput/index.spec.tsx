/*
    テスト内容
    ・初期の表示は空である
    ・入力直後は「入力中」と表示される
    ・入力して1秒経過した後に入力した内容が表示される
    ・入力して1秒経過した後にonChangeコールバックが呼ばれる
*/

import { render, screen, RenderResult, fireEvent, act } from '@testing-library/react'
import { DelayInput } from './index'

// DelayInputコンポーネントに関するテスト
describe('DelayInput', () => {
    let renderResult: RenderResult
    let handleChange: jest.Mock

    beforeEach(() => {
        // タイマーをjestのものに置き換える
        jest.useFakeTimers()
        /*
            実際に1秒待機する処理を差し込むテストを書いて実行することはできるが
            このようなテストが増えるにつれテストを実行する時間が増大してしまうという問題が出てくる

            これを防ぐのにjestのタイマーモックを使用する
            タイマーモックを使用することで、実際に待たずともタイマーのコールバックを実行できる

            使用するには、テスト前にjest.useFakeTimer()を呼びだしてタイマーをモックのものに差し替えて、テスト後にjest.useRealTimers()を呼びだしてタイマーを戻す。
            そして、テスト中でタイマーが設定された後にjest.runAllTimers()を実行することで、タイマーのコールバックを実行する
        */

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
        jest.useRealTimers()
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

    // 入力して1秒後にテキストが表示されるかテスト
    it('should display input text 1second after onChange event occurs', async () => {
        const inputText = 'Test Input Text'
        const inputNode = screen.getByTestId('input-text') as HTMLInputElement

        // inputのonChangeイベントを呼びだす
        fireEvent.change(inputNode, { target: { value: inputText } })

        // act関数で実行することにより、タイマーのコールバック中で起きる状態変更が反映されることを保証する
        await act(() => {
            jest.runAllTimers()
        })

        const spanNode = screen.getByTestId('display-text') as HTMLSpanElement

        // 入力したテキストが表示されるか確認
        expect(spanNode).toHaveTextContent(`入力したテキスト: ${inputText}`)
    })

    // 入力して1秒後にonChangeが呼ばれるかテスト
    it('should call onChange 1second after onChange event occurs', async () => {
        const inputText = 'Test Inputt Text'
        const inputNode = screen.getByTestId('input-text') as HTMLInputElement

        // inputのonChangeイベントを呼びだす
        fireEvent.change(inputNode, { target: { value: inputText } })

        // タイマーの実行
        await act (() => {
            jest.runAllTimers()
        })

        // モック関数を渡し、呼ばれたかを確認する。
        expect(handleChange).toHaveBeenCalled()
    })
})