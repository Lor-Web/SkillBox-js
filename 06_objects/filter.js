let users = [
	{name: 'Ruslan', surname: 'Ruya'},
	{name: 'Maxim', surname: 'Fadeev'},
	{name: 'Sergey', surname: 'Ivanov'}
  ]

  let user = users.filter(item => item.name == 'Maxim');

  console.log(user);
