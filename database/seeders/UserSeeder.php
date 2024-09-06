<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'login' => 'admin', // Логин пользователя
            'password' => '123123',
            // 'password' => Hash::make('password'), // Пароль, обязательно хешированный
            'name' => 'Иван',
            'patronymic' => 'Иванович',
            'sname' => 'Иванов',
            'permission' => 'Модератор',
            'user_password' => '123123',
        ]);
    }
}
