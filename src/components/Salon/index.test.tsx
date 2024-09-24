import { render } from '@testing-library/react'
import { Salon } from '.'

describe('Salon', () => {
  it('should render the Salon', () => {
    const { getByText } = render(<Salon  name={'test'}/>)

    const component = getByText('test')

    expect(component).toBeInTheDocument()
  })
})
