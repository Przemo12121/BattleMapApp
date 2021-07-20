using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BattleMapApp.UsersMapping
{
    public class UsersMapping<T>
    {
        private readonly Dictionary<T, HashSet<string>> _activeUsers =
            new Dictionary<T, HashSet<string>>();

        public void Add(T key, string connectionId)
        {
            lock (_activeUsers)
            {
                HashSet<string> connections;
                if (!_activeUsers.TryGetValue(key, out connections))
                {
                    connections = new HashSet<string>();
                    _activeUsers.Add(key, connections);
                }

                lock (connections)
                {
                    connections.Add(connectionId);
                }
            }
        }

        public IEnumerable<string> GetConnections(T key)
        {
            HashSet<string> connections;
            if (_activeUsers.TryGetValue(key, out connections))
            {
                return connections;
            }

            return Enumerable.Empty<string>();
        }

        public void Remove(T key, string connectionId)
        {
            lock (_activeUsers)
            {
                HashSet<string> connections;
                if (!_activeUsers.TryGetValue(key, out connections))
                {
                    return;
                }

                lock (connections)
                {
                    connections.Remove(connectionId);

                    if (connections.Count == 0)
                    {
                        _activeUsers.Remove(key);
                    }
                }
            }
        }
    }
}
