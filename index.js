module.exports = function Marker(mod) {
	const command = mod.command || mod.require.command;
		let
		target,
		markerss = [];
		marked = [];
		msg = null;
		
		function getName(n,color)
		{
			if(color < 0 || color > 2)
			{
				color = 0;
			}
			if(Players.indexOf(n) >= 0)
			{
				target = Ids[Players.indexOf(n)];
				/*if(marked.indexOf(n) >= 0)
				{
					mod.log("okay yeah i do this");
					removeMark(n);
				}*/
				markerss.push({color,target});
				mod.toServer('C_PARTY_MARKER',1, {
					markers: markerss
				});
				mod.toServer('S_PARTY_MARKER',1, {
					markers: markerss
				});
				msg = "Player marked."
				marked.push(n);
			}
			else
			{
				msg = "Player not found, Please make sure you typed the name correctly including capital letters."
			}
		}
		
		/*function removeMark(n) //Fix array
		{
			/*if(Players.indexOf(n) >= 0)
			{
				target = Ids[Players.indexOf(n)];
				mod.log(markerss);
				
				
				
				for(i = 0;i < 3;)//Fix and clean up
					{
						mk = [];
						color = i;
						mk.push({color,target});
						mod.log(mk);
						mod.log(markerss.indexOf(mk));
						if(markerss.indexOf(mk) >= 0)
						{
							markerss.splice(markerss.indexOf(mk),1);
						}
						else
						{
							i++;
						}
					}
				//markerss.splice(markerss.indexOf({i,target}),1);	
				mod.toServer('C_PARTY_MARKER',1, {
					markers: markerss
				});
				msg = "Player unmarked."
				marked.splice(marked.indexOf(n),1);
			}
			else
			{
				msg = "Player was not marked."
			}
			// Very inefficient approach but idk how else to make it work for now.
			
			if(marked.indexOf(n) >= 0) //Checking if target is already marked.
			{
				//We remove all marks from our markerss array
				removeAll();
				marked.splice(marked.indexOf(n),1);
				//Adding all markers again
				for(i=0;i < marked.length;i++)
				{
					
				}
			}
		}*/
		
		function removeAll()
		{
			markerss.splice(0,markerss.length);
			mod.toServer('C_PARTY_MARKER',1, {
					markers: markerss
				});
			msg = "All marks removed."
		}
		
		mod.game.on('enter_game', () => {
        Players = [];
        Ids = [];
    });
		
		mod.hook('S_SPAWN_USER', 15, event => {
        Players.push(event.name);
		Ids.push(event.gameId);
    });
	
	mod.hook('S_DESPAWN_USER', 3, event => {
        delete Players[event.name];
    });

		 command.add('mk', {
		mark(name,color){	
			getName(name,color);
			command.message(msg);
		},
		rm(name){
			removeMark(name);
			command.message(msg);
		},
		rmall(){
			removeAll();
			command.message(msg);
		}
		 });
}