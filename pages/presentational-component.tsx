import React from 'react'
// import './styles.css'

type ButtonProps = {
    label: string
    text: string
    disabled: boolean
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

// ボタンとラベルを表示するコンポーネント
export const Button = (props: ButtonProps) => {
    const { label, text, disabled, onClick } = props

    // propsで渡されたデータを元に見た目を実装する
    return (
        <div className='button-container'>
            <span>{ label }</span>
            <button disabled={disabled} onClick={onClick} >{ text }</button>
        </div>
    )
}

/*
    どういった文章をラベルやボタンに表示するか、ボタンをいつ無効化するか、ボタンを押したときの挙動などは一切ここでは定義していない。
    あくまでpropsから渡されたデータを元にデザインを実装している。
*/