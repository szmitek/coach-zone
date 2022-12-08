import Link from 'next/link'; 
import PlayerStyles from './styles/PlayerStyles';
import Position from './styles/Position';
import PlayerTitle from './styles/PlayerTitle'
import Number from './styles/Number';

export default function Player({player}) {
    return <PlayerStyles>
                <img src={player?.photo?.image?.publicUrlTransformed} alt={player.name} />
                <PlayerTitle>
                    <Link href={`/player/${player.id}`}>
                        {player.name}
                    </Link>
                </PlayerTitle>
                <Position>{player.position}</Position>
                <Number>{player.number}</Number>
                <div className="buttonList">
                    <Link href={{
                        pathname: 'update',
                        query: {
                            id: player.id
                        }
                    }}
                    >
                        Edit
                    </Link>
                </div>
            </PlayerStyles>;
}