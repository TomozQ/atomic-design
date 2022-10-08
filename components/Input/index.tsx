import React, { useState } from 'react'

type InputProps = JSX.IntrinsicElements['input'] & {
    label: string
}

export const Input = (props: InputProps) => {
    const { label, ...rest } = props

    const [text, setText] = useState('')

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const resetInputField = () => {
        setText('')
    }

    return (
        <div>
            {/* <label htmlFor={props.id}>{label}</label> */}
            {/* label要素を使用しない場合は、input要素にaria-labelを指定することでもgetByLabelTextで要素を取得することができる */}
            <input {...rest} type="text" value={text} onChange={onInputChange} aria-label={label}/>
            <button onClick={ resetInputField }>Reset</button>
        </div>
    )
}