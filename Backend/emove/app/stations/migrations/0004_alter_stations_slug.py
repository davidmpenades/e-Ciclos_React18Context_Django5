from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stations',
            name='slug',
            field=models.SlugField(blank=True, max_length=200, unique=True),
        ),
    ]