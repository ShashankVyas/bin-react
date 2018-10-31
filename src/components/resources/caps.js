
//Options for Ticket dropDown
export const options = [
			{
			 type: 'group', name: 'Electronic Issues', items: [
			   { value: 'Computer', label: 'Computer Issues' },
			   { value: 'Projector', label: 'Projecter Issues' },
			   { value: 'Telephony', label: 'Telephone Issues' },
			   { value: 'WiFi/LAN Connectivity', label: 'Wifi Issues' },
			   { value: 'Video Conferencing', label: 'Video Conference Issues' },	   
			   { value: 'othe', label: 'Other Issue' }
			 ]
			},
			{
			 type: 'group', name: 'Room Issues', items: [
			   { value: 'Lights', label: 'Light Issues' },
			   { value: 'Power plug points', label: 'Power plug Issues' },
			   { value: 'equi', label: 'Equipment Issue' },
			   { value: 'othe', label: 'Other Issue' }
			 ]
			},
			{
			 type: 'group', name: 'Misc Issues', items: [
			   { value: 'othe', label: 'Other Issue' }
			 ]
			}
		]
	
//Default option		
export const defaultOption = options[0]