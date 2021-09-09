import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatHintModule } from '@angular/material/hint';
import { MatInputModule } from '@angular/material/input';

//mila importena doly ze module ilaina amle style, atao anatinio tab io de io no importena any am app.module.ts/import[]
export const MaterialModules = [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    // MatHintModule,
    // MatInput,
]