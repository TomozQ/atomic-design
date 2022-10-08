import React, { useState, useCallback } from "react";
import { Button } from "./presentational-component";

// ポップアップを表示するためのフック
const usePopup = () => {
    // 与えられたテキストを表示するポップアップを出現させる関数
    const cb = useCallback((text: string) => {
        prompt(text)
    },[])

    return cb
}

type CountButtonProps = {
    label: string
    maximum: number
}

// クリックされた回数を表示するボタンを表示するコンポーネント
export const CountButton = (props: CountButtonProps) => {
    const { label, maximum } = props
    
    // アラートを表示させるためのフックを使う
    const displayPopup = usePopup()

    // カウントを保持するためのフック
    const [ count, setCount ] = useState(0)

    // ボタンが押されたときの挙動
    const onClick = useCallback(() => {
        // カウントを更新する
        const newCount = count + 1
        setCount(newCount)

        if( newCount >= maximum ) {
            // アラートを表示する
            displayPopup(`You've clicked ${newCount} times`)
        }
    },[count, maximum])

    // 状態を元に表示に必要なデータを求める
    const disabled = count >= maximum
    const text = disabled ? 'Can\'t click any more' : `You've clicked ${count} times`

    // Presentational Componentを返す
    return (
        <Button disabled={ disabled } onClick={ onClick } label={label} text={text} />
    )
}