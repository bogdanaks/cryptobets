import React from 'react'
import cn from 'classnames'

import styles from './styles.module.scss'

interface ButtonProps {
  title: string
  onButtonClick: () => void
  height?: number
  fontSize?: number
  className?: any
}

const Button: React.FC<ButtonProps> = ({ title, onButtonClick, height, fontSize, className }) => {
  return (
    <button className={cn(styles.connectBtn, className)} onClick={onButtonClick} style={{ height: `${height}px`, fontSize: `${fontSize}px` }}>
      {title}
    </button>
  )
}

export default Button
