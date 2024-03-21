// import React from 'react';
// import { AppBar, Toolbar, Typography } from '@mui/material';

// export const NotFoundPage = () => {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <AppBar position="fixed" style={{ top: 0, bottom: 'auto' }}>
//         <Toolbar>
//           <Typography variant="h6">Top AppBar</Typography>
//         </Toolbar>
//       </AppBar>
//       <main style={{ flexGrow: 1, padding: '64px 20px 20px 20px' }}>
//         {/* Lots of content */}
//         <Typography paragraph>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna sit amet ipsum convallis viverra vel nec elit. Suspendisse potenti. Mauris at consectetur turpis, sit amet volutpat velit. Nam condimentum ultrices risus vel porttitor. Donec ut nisi sed ex lacinia lacinia. Sed nec magna eu ex luctus viverra ut sed sapien. Mauris ac sollicitudin ligula, a ultricies lectus. Phasellus pulvinar sem quis metus scelerisque, id malesuada turpis tempor. Cras id ante eu lorem rhoncus tempus. Nulla facilisi. Proin commodo dolor non justo aliquam, quis tempor mauris semper. Sed a urna et nisl ullamcorper egestas. Nulla in ligula vitae lectus fringilla aliquam nec sed ipsum.
//         </Typography>
//         <Typography paragraph>
//           Vivamus gravida, velit eget vulputate bibendum, tortor libero tincidunt nulla, ac tincidunt justo ligula non eros. Proin eu leo in orci interdum mattis. Integer tempor velit a orci dictum, id consequat nulla finibus. Morbi quis tempus libero, non efficitur elit. Pellentesque sit amet nulla aliquam, sollicitudin enim eget, consequat lectus. Morbi et dictum nulla, vel gravida elit. Integer ut enim in quam venenatis vulputate. Nulla nec nunc tincidunt, laoreet ex sit amet, dictum magna.
//         </Typography>
//         <Typography paragraph>
//           Etiam accumsan eros vel erat sodales, non venenatis nulla pellentesque. Donec fringilla nec orci sit amet mattis. Fusce tincidunt augue non velit fringilla, sed tempus mauris congue. Nulla facilisi. Nam id justo sed velit ultrices auctor. Proin commodo vel nulla in ullamcorper. Curabitur fermentum sit amet risus id suscipit. Integer in enim sodales, rhoncus mi vel, fringilla odio. Nulla facilisi. Cras posuere tincidunt orci, ac fringilla neque maximus vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam consequat bibendum erat, et scelerisque ante lacinia in. Donec vehicula ligula id convallis cursus. Nunc semper est sit amet diam cursus, vitae aliquet turpis tristique. Ut vitae mi arcu. Vivamus efficitur tincidunt ante, sed volutpat nibh. Suspendisse non augue ultrices, posuere enim a, bibendum justo.
//         </Typography>
//         {/* End of lots of content */}
//       </main>
//       <AppBar position="fixed" style={{ top: 'auto', bottom: 0 }}>
//         <Toolbar>
//           <Typography variant="h6">Bottom AppBar</Typography>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

import React from 'react'

export const NotFoundPage = () => {
  return (
    <div className="content-layout">
      <h1 id="page-title" className="content__title">
        Not Found
      </h1>
    </div>
  )
}
