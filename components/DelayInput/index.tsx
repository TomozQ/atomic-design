/*
    テキストボックスの横に入力した値を表示する
    ただし、入力している間は「入力中」と表示し、入力し終わって1秒経過した後に入力した値を表示し、onChangeコールバックを呼ぶ
*/

import React, { useCallback, useState, useRef } from "react";

type DelayButtonProps = {
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export const DelayInput = (props: DelayButtonProps) => {
    const { onChange } = props

    // 入力中かどうかを保持する状態
    const [ isTyping, setIsTyping ] = useState(false)
    // input要素に表示するテキストを保持する状態
    const [ inputValue, setInputValue ] = useState('')
    // spanに表示するテキストを保持する状態
    const [ viewValue, setViewValue ] = useState('')
    // タイマーを保持するRef
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // 入力中のフラグをセットする
        setIsTyping(true)
        // inputに表示するテキストを更新する
        setInputValue(e.target.value)

        // timerRefに以前設定したタイマーがある場合は先に解除する
        if(timerRef.current !== null) {
            clearTimeout(timerRef.current)
        }

        // 1秒後に実行するタイマーをセットする
        timerRef.current = setTimeout(() => {
            timerRef.current = null

            // 入力中のフラグを解除する
            setIsTyping(false)
            // spanに表示するテキストを更新する
            setViewValue(e.target.value)
            // onChangeコールバックを呼ぶ
            onChange(e)
        }, 1000)

    }, [onChange])

    const text = isTyping ? '入力中・・・' : `入力したテキスト: ${ viewValue }`

    return (
        <div>
            <input data-testid='input-text' value={ inputValue } onChange={handleChange} />
            <span data-testid='display-text'>{ text }</span>
        </div>
    )
}