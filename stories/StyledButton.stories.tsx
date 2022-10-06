import { ComponentMeta } from '@storybook/react'
import React, { useState } from 'react'
import { StyledButton } from '../components/StyledButton'
import { action } from '@storybook/addon-actions'

// ファイル内のStoryの設定（メタデータオブジェクト）
export default {
    // グループ名
    title: 'StyledButton',
    // 使用するコンポーネント
    component: StyledButton,
    // onClickが呼ばれたときにclickedというアクションを出力する
    argTypes: { onClick: {action: 'clicked'}},
} as ComponentMeta<typeof StyledButton>

const incrementAction = action('increment')

export const Primary = (props: any) => {
    const [count, setCount] = useState(0)
    const onClick = (e: React.MouseEvent) => {
        incrementAction(e, count)
        setCount((c) => c + 1)
    }
    return (
        <StyledButton { ...props } variant='primary' onClick={ onClick }>
            Count: { count }
        </StyledButton>
    )
}

export const Success = (props: any) => {
    return (
        <StyledButton { ...props } variant='success'>
            Success
        </StyledButton>
    )
}

export const Transparent = (props: any) => {
    return (
        <StyledButton { ...props } variant='transparent'>
            Transparent
        </StyledButton>
    )
}