import { UserShort } from '../../../types';
import Avatar from '../../avatar/avatar';

type HostInformationProps = {
  description: string;
  host: UserShort;
}


export default function HostInformation({host, description}: HostInformationProps): JSX.Element {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <Avatar type='Host' avatarUrl={ host.avatarUrl } isPro={ host.isPro }/>
        <span className="offer__user-name">{host.name}</span>
        {host.isPro && <span className="offer__user-status">Pro</span>}
      </div>

      <div className="offer__description">
        <p className="offer__text">{description}</p>
      </div>
    </div>
  );
}
