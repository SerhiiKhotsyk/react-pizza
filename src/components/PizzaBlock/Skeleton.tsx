import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#ededed"
    foregroundColor="#c2c2c2"
    {...props}>
    <rect x="560" y="551" rx="3" ry="3" width="88" height="6" />
    <rect x="571" y="549" rx="3" ry="3" width="52" height="6" />
    <rect x="423" y="554" rx="3" ry="3" width="410" height="6" />
    <rect x="366" y="548" rx="3" ry="3" width="380" height="6" />
    <rect x="469" y="554" rx="3" ry="3" width="178" height="6" />
    <rect x="564" y="535" rx="0" ry="0" width="26" height="26" />
    <circle cx="142" cy="133" r="131" />
    <circle cx="588" cy="531" r="40" />
    <rect x="15" y="281" rx="5" ry="5" width="255" height="21" />
    <rect x="567" y="515" rx="0" ry="0" width="13" height="64" />
    <rect x="1" y="329" rx="5" ry="5" width="280" height="73" />
    <rect x="6" y="441" rx="7" ry="7" width="126" height="37" />
    <rect x="150" y="441" rx="14" ry="14" width="126" height="37" />
  </ContentLoader>
);

export default Skeleton;
