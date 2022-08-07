const SvgPlaceholder = (props) => (
  <svg
    width='1em'
    height='1em'
    viewBox='0 0 684 478'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path fill={props.secondary} d='M0 0h684v478H0z' />
    <path stroke={props.primary} strokeWidth={10} d='M123 106h438v265H123z' />
    <circle cx={418} cy={170} r={32} fill={props.primary} />
    <path d='m274 220 135.1 153H138.9L274 220Z' fill={props.primary} />
    <path d='m444.5 268 93.964 106.5H350.536L444.5 268Z' fill={props.primary} />
  </svg>
)

export default SvgPlaceholder
