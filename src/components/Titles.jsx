export function MainTitle({title, urlIcon, mt, mb}) {
    return (
        <h2 className={`text-center mt-${mt} mb-${mb}`} style={{ fontSize: "30px" }}>
        <img
          src={urlIcon}
          alt={`icono de ${title}`}
          style={{ width: "40px", verticalAlign: "top", marginInlineEnd: '7px' }}
        />
        {title}
      </h2>
    )
}
export function SubTitle({title, urlIcon}) {
  return (
      <h5 className="text-start" >
      <img
        src={urlIcon}
        alt={`icono de ${title}`}
        style={{ width: "28px", verticalAlign: "top", marginInlineEnd: '7px' }}
      />
      {title}
    </h5>
  )
}
export function TextComponentDescription({label, data}) {
  return (
    <span style={{fontWeight: '600'}}>{label}:<span style={{fontWeight: '400'}}>{' '}{data}</span></span>
  )
}