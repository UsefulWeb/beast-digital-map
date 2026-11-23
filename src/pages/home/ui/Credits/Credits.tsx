import S from './Credits.module.scss'

export const Credits = () => (
  <div className={S.credits}>
    Made by{' '}
    <a
      target={'_blank'}
      href={'https://github.com/neizerth'}
      className={S.author}
      rel="noopener"
    >
      @neizerth
    </a>
    .
    <br />
    Background and logo are made by{' '}
    <a
      target={'_blank'}
      href={'https://studiomidhall.com/'}
      className={S.author}
      rel="noopener"
    >
      Studio Midhall
    </a>
    .
  </div>
)
