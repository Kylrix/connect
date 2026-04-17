import { Route as rootRoute } from './routes/__root';
import { Route as r1 } from './routes/index';
import { Route as r2 } from './routes/chats';
import { Route as r3 } from './routes/chat.$id';
import { Route as r4 } from './routes/call.$id';
import { Route as r5 } from './routes/calls';
import { Route as r6 } from './routes/groups.invite.$conversationId';
import { Route as r7 } from './routes/post.$id';
import { Route as r8 } from './routes/settings';
import { Route as r9 } from './routes/u.$username';

export const routeTree = rootRoute.addChildren([r1, r2, r3, r4, r5, r6, r7, r8, r9]);
