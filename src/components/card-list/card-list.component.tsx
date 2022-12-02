import Card from '../card/card.component'
import { User } from '../../App'
import './card-list.styles.css'

type CardListProps = {
    monsters: User[]
}

const CardList = ({ monsters }: CardListProps) => (
	<div className='card-list'>
		{monsters.map((monster) => {
			return <Card monster={monster} key={monster.id} />
		})}
	</div>
)

export default CardList
