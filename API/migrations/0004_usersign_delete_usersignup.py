# Generated by Django 4.2.5 on 2023-11-04 12:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSign',
            fields=[
                ('User_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_First_Name', models.CharField(max_length=30)),
                ('user_Last_Name', models.CharField(max_length=30)),
                ('user_password', models.CharField(max_length=128)),
                ('email', models.EmailField(max_length=254)),
            ],
        ),
        migrations.DeleteModel(
            name='UserSignup',
        ),
    ]
