import { ButtonHTMLAttributes, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ className, disabled: _disabled, onClick, ...rest }: ButtonProps) {
  const [disabled, setDisabled] = useState(false)
  async function _onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    try {
      setDisabled(true)
      if (onClick) {
        await onClick(e)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setDisabled(false)
    }
  }
  return (
    <button
      className={twMerge(
        'h-fit whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold text-slate-900 focus:outline-none lg:px-6 lg:py-3 lg:text-base',
        className
      )}
      {...rest}
      onClick={(e) => _onClick(e)}
      disabled={_disabled === true ? true : disabled}
    />
  )
}
